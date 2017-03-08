require "capybara"
require "capybara/dsl"

class Scraper
  include Capybara::DSL

  def run
    # fake user agent to avoid getting redirected to error pages
    # find alternatives here: https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
    page.driver.headers = {
      "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }

    # scrape and aggregate results from chamber pages
    witness_form_urls = scrape_chamber_committees_pages([
      "http://my.ilga.gov/Hearing/AllHearings?chamber=H",
      "http://my.ilga.gov/Hearing/AllHearings?chamber=S"
    ])

    puts "\n- finished, findings:"
    puts "  links: #{witness_form_urls.count}"
  end

  private

  def scrape_chamber_committees_pages(chamber_urls)
    chamber_urls.reduce([]) do |witness_form_urls, chamber_url|
      witness_form_urls + scrape_chamber_committees_page(chamber_url)
    end
  end

  def scrape_chamber_committees_page(url)
    puts "\n- visit chamber"
    puts "  url: #{url}"

    visit(url)
    sleep(1) # required if the page loads javascript / xhr data

    # find all committee links on this page
    committee_links = page.find_all(".t-last a")
    committee_urls = committee_links.map { |link| link["href"] }

    # scrape and aggregate witness form links from the committee pages
    committee_urls.reduce([]) do |witness_form_urls, committee_url|
      witness_form_urls + scrape_committee_hearings_page(committee_url)
    end
  end

  def scrape_committee_hearings_page(url)
    puts "\n- visit committee"
    puts "  url: #{url}"

    visit(url)

    # find all witness form urls on this page
    witness_form_links = page.find_all(".slipiconbutton")
    witness_form_urls = witness_form_links.map { |link| link["href"] }
    puts "  links: #{witness_form_urls.count}"

    # find the next page button
    next_page_button = page.find(".t-arrow-next").first(:xpath, ".//..")
    has_next_page = !next_page_button[:class].include?("t-state-disabled")
    puts "  next?: #{has_next_page}"

    # aggregate the next page's results if its available
    if has_next_page
      next_page_url = next_page_button["href"]
      return witness_form_urls + scrape_committee_hearings_page(next_page_url)
    else
      return witness_form_urls
    end
  end

  # helpers
  def take_screenshot(page, title="screenshot.png")
    page.save_screenshot(title)
  end
end
