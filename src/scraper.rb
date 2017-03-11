require "active_support/all"
require "capybara"
require "capybara/dsl"
require "json"
require_relative "./errors"
require_relative "./requests"
require_relative "./models/chamber"

module Scraper
  class << self
    include Capybara::DSL
  end

  def self.run
    puts "- starting scrape"

    # fake user agent to avoid getting redirected to error pages
    # find alternatives here: https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
    page.driver.headers = {
      "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }

    # scrape and aggregate results from chamber pages
    chambers = add_hearings_to_chambers([
      Chamber.new(name: "House", key: "H"),
      Chamber.new(name: "Senate", key: "S")
    ])

    hearings = chambers.flat_map(&:hearings)
    bills = hearings.flat_map(&:bills)

    puts "\n- finished scrape:"
    puts "  hearings: #{hearings.count}"
    puts "  bills: #{bills.count}"

    chambers
  end

  private

  # hearings
  def self.add_hearings_to_chambers(chambers)
    chambers.each do |chamber|
      chamber.hearings = hearings_from_chamber_page(chamber)
    end
  end

  def self.hearings_from_chamber_page(chamber)
    # committee data is pulled in by xhr so we have to sleep, we could try
    # hitting that api directly (its data is much richer)
    visit(chamber.url)

    # click the month tab to view all the upcoming hearings
    month_tab = page.find("#CommitteeHearingTabstrip li a", text: "Month")
    month_tab.click
    sleep(2)

    # get the all hearings from the monthly tab
    hearings_from_monthly_chamber_page(chamber, chamber.url)
  end

  def self.hearings_from_monthly_chamber_page(chamber, url, page_number = 0)
    puts "\n- visit chamber"
    puts "  name: #{chamber.name}"
    puts "  page: #{page_number}"

    # we're assumed to already be here on page_number 0
    if page_number != 0
      visit(url)
      sleep(2)
    end

    # create hearings, winding together scraped data and request data
    hearing_rows = page.find_all("#CommitteeHearingTabstrip tbody tr")
    hearings_map = CommitteeHearingsRequest.fetch(chamber, page_number)
    hearings = hearing_rows
      .map { |row| create_hearing(row, hearings_map) }
      .each { |hearing| hearing.bills = bills_from_hearing_page(hearing, hearing.url) }

    # aggregate the next page's results if it's available
    next_page_url = find_next_page_url
    next_page_url.nil? ? hearings : hearings + hearings_from_monthly_chamber_page(next_page_url, page_number + 1)
  end

  def self.create_hearing(row, hearings_map)
    columns = row.find_all("td", visible: false)

    # rip the committee id out of the first hidden field and ensure it exists
    committee_id = columns[0]&.text(:all)&.to_i
    if committee_id.blank?
      raise Error, "Failed to find committee id for row: #{row}"
    end

    committee_hearing_data = hearings_map[committee_id]
    if committee_hearing_data.blank?
      raise Error, "Failed to find hearing data for committee id: #{committee_id}"
    end

    # construct the hearing with available attributes
    hearing_data = committee_hearing_data[:CommitteeHearing]

    hearing = Hearing.new
    hearing.id = hearing_data[:HearingId]
    hearing.url = columns[3]&.find("a")["href"]
    hearing.location = committee_hearing_data[:Location]
    hearing.is_cancelled = hearing_data[:IsCancelled]
    hearing.allows_slips = hearing_data[:AllowSlips]
    hearing.committee = create_committee(committee_hearing_data)

    # dates from the response data look like: "Date(<millis>)"
    date_string = hearing_data[:ScheduledDateTime][/Date\((\d+)\)/, 1]
    hearing.date_time = Time.zone.at(date_string.to_f / 1000.0)

    hearing
  end

  def self.create_committee(committee_hearing_data)
    committee = Committee.new
    committee.id = committee_hearing_data[:CommitteeId]
    committee.name = committee_hearing_data[:CommitteeDescription]
    committee
  end

  # bills
  def self.bills_from_hearing_page(hearing, url)
    puts "\n- visit hearing #{hearing.id}"
    puts "  committee_id: #{hearing.committee.id}"
    puts "  url: #{url}"

    visit(url)

    # find all bills on this page
    bill_rows = page.find_all("#GridCurrentCommittees tbody tr")
    bills = bill_rows.map { |row| create_bill(row) }.compact
    puts "  bills: #{bills.count}"

    # find the url of the next page
    next_page_url = find_next_page_url
    puts "  next?: #{!next_page_url.nil?}"

    # add bill details by scraping the bill page
    bills.each { |bill| add_details_to_bill(bill) }

    # aggregate the next page's results if it's available
    next_page_url.nil? ? bills : bills + bills_from_hearing_page(hearing, next_page_url)
  end

  def self.create_bill(row)
    # short circuit if we can't find a link
    witness_slip_link = row.first(".slipiconbutton")
    if witness_slip_link.nil?
      return nil
    end

    columns = row.find_all("td", visible: false)

    # construct the bill with available attributes
    bill = Bill.new
    bill.id = columns[0]&.text(:all)
    bill.document = columns[2]&.text
    bill.sponsor_name = columns[3]&.text
    bill.description = columns[4]&.text
    bill.witness_slip_url = witness_slip_link["href"]

    bill
  end

  def self.add_details_to_bill(bill)
    # visit(bill.url)
    # require "pry"; binding.pry
  end

  # helpers
  def self.find_next_page_url
    next_page_button = page.find(".t-arrow-next").first(:xpath, ".//..")
    has_next_page = !next_page_button[:class].include?("t-state-disabled")
    has_next_page ? next_page_button["href"] : nil
  end

  def self.take_screenshot(page, title="screenshot.png")
    page.save_screenshot(title)
  end
end
