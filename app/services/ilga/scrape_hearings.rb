module Ilga
  class ScrapeHearings < Scraper
    Hearing = Struct.new(
      :url,
      :external_id
    )

    def call(chamber)
      info("> #{task_name}: start")
      info("  - chamber: #{chamber.name}")
      result = scrape_hearings(chamber)

      info("\n> #{task_name}: finished")
      result
    end

    private

    def scrape_hearings(chamber)
      info("\n> #{task_name}: visit chamber root")
      page.visit(chamber.url)

      # click the month tab to view all the upcoming hearings
      month_tab = page.first('#CommitteeHearingTabstrip li a', text: 'Month')
      raise Error, "#{task_name}: couldn't find month 'tab'" if month_tab.blank?
      month_tab.click

      scrape_paged_hearings(chamber, chamber.url)
    end

    def scrape_paged_hearings(chamber, url, page_number = 0)
      return [] if url.blank?

      info("\n> #{task_name}: visit paged committee hearings")
      info("  - name: #{chamber.name}")
      info("  - page: #{page_number}")

      # visit page if necessary and wait for it to load
      page.visit(url) if page_number != 0
      wait_for_ajax
      return [] if page.has_css?('.t-no-data')

      # get attrs from each row
      attrs = page
        .find_all('#CommitteeHearingTabstrip tbody tr')
        .map { |row| build_attrs(row) }
        .compact

      # aggregate the next page's results if it's available
      next_url = find_next_page_url
      info("  - next?: #{next_url.present?}")
      attrs + scrape_paged_hearings(chamber, next_url, page_number + 1)
    end

    def build_attrs(row)
      url = row.first('td.t-last a')&.[](:href)
      return nil if url.nil?

      uri = clean_uri(url)
      Hearing.new(
        uri.to_s,
        uri.path.split('/').last # external_id
      )
    end

    # find the next page link by searching for its icon
    def find_next_page_url
      link = page.first(:xpath, "//*[@class='t-arrow-next']/..")
      return nil if link.blank? || link[:class].include?('t-state-disabled')
      link[:href]
    end

    def clean_uri(url)
      uri = URI.parse(url)
      uri.query = URI.encode_www_form(CGI.parse(uri.query).without('_'))
      uri
    end
  end
end
