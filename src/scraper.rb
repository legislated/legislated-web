require "capybara"
require "capybara/dsl"
require_relative "./witness_slip"

module Scraper
  class << self
    include Capybara::DSL
  end

  def self.run
    # fake user agent to avoid getting redirected to error pages
    # find alternatives here: https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
    page.driver.headers = {
      "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }

    # scrape and aggregate results from chamber pages
    witness_slip_urls = scrape_chamber_committees_pages([
      "http://my.ilga.gov/Hearing/AllHearings?chamber=H",
      "http://my.ilga.gov/Hearing/AllHearings?chamber=S"
    ])

    puts "\n- finished, findings:"
    puts "  links: #{witness_slip_urls.count}"
  end

  private

  def self.scrape_chamber_committees_pages(chamber_urls)
    chamber_urls.reduce([]) do |witness_slip_urls, chamber_url|
      witness_slip_urls + scrape_chamber_committees_page(chamber_url)
    end
  end

  def self.scrape_chamber_committees_page(url)
    puts "\n- visit chamber"
    puts "  url: #{url}"

    visit(url)
    sleep(1) # required if the page loads javascript / xhr data

    # find all committee links on this page
    committee_links = page.find_all(".t-last a")
    committee_urls = committee_links.map { |link| link["href"] }

    # scrape and aggregate witness slip links from the committee pages
    committee_urls.reduce([]) do |witness_slip_urls, committee_url|
      witness_slip_urls + scrape_committee_hearings_page(committee_url)
    end
  end

  def self.scrape_committee_hearings_page(url)
    puts "\n- visit committee"
    puts "  url: #{url}"

    visit(url)

    # find all witness slips on this page
    witness_slip_rows = page.find_all("#GridCurrentCommittees tbody tr")
    witness_slips = witness_slip_rows.map do |row|
      witness_slip_from_row(row)
    end.compact
    puts "  slips: #{witness_slips.count}"

    # find the next page button
    next_page_button = page.find(".t-arrow-next").first(:xpath, ".//..")
    has_next_page = !next_page_button[:class].include?("t-state-disabled")
    puts "  next?: #{has_next_page}"

    # aggregate the next page's results if it's available
    if has_next_page
      next_page_url = next_page_button["href"]
      return witness_slips + scrape_committee_hearings_page(next_page_url)
    else
      return witness_slips
    end
  end

  def self.witness_slip_from_row(row)
    # short circuit if we can't find a link
    link = row.first(".slipiconbutton")
    if link.nil?
      return nil
    end

    columns = row.find_all("td")

    # construct the slip with available attributes
    witness_slip = WitnessSlip.new
    witness_slip.url = link["href"]
    witness_slip.document_number = columns[0]&.text
    witness_slip.sponsor_name = columns[1]&.text
    witness_slip.description = columns[2]&.text

    witness_slip
  end

  # helpers
  def self.take_screenshot(page, title="screenshot.png")
    page.save_screenshot(title)
  end
end
