require "capybara"
require "capybara/dsl"
require_relative "./bill"

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
    bills = scrape_chamber_committees_pages([
      "http://my.ilga.gov/Hearing/AllHearings?chamber=H",
      "http://my.ilga.gov/Hearing/AllHearings?chamber=S"
    ])

    puts "\n- finished, findings:"
    puts "  bills: #{bills.count}"
  end

  private

  def self.scrape_chamber_committees_pages(chamber_urls)
    chamber_urls.reduce([]) do |bills, chamber_url|
      bills + scrape_chamber_committees_page(chamber_url)
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

    # scrape and aggregate bills from the committee pages
    committee_urls.reduce([]) do |bills, committee_url|
      bills + scrape_committee_hearings_page(committee_url)
    end
  end

  def self.scrape_committee_hearings_page(url)
    puts "\n- visit committee"
    puts "  url: #{url}"

    visit(url)

    # find all bills on this page
    bill_rows = page.find_all("#GridCurrentCommittees tbody tr")
    bills = bill_rows.map do |row|
      bill_from_row(row)
    end.compact
    puts "  bills: #{bills.count}"

    # find the next page button
    next_page_button = page.find(".t-arrow-next").first(:xpath, ".//..")
    has_next_page = !next_page_button[:class].include?("t-state-disabled")
    puts "  next?: #{has_next_page}"

    # aggregate the next page's results if it's available
    if has_next_page
      next_page_url = next_page_button["href"]
      return bills + scrape_committee_hearings_page(next_page_url)
    else
      return bills
    end
  end

  def self.bill_from_row(row)
    # short circuit if we can't find a link
    witness_slip_link = row.first(".slipiconbutton")
    if witness_slip_link.nil?
      return nil
    end

    columns = row.find_all("td")

    # construct the bill with available attributes
    bill = Bill.new
    bill.document_number = columns[0]&.text
    bill.sponsor_name = columns[1]&.text
    bill.description = columns[2]&.text
    bill.witness_slip_url = witness_slip_link["href"]

    bill
  end

  # helpers
  def self.take_screenshot(page, title="screenshot.png")
    page.save_screenshot(title)
  end
end
