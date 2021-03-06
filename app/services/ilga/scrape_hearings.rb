module Ilga
  class ScrapeHearings
    include Scraper

    Hearing = Struct.new(
      :ilga_id,
      :url
    )

    def call(chamber)
      info("> #{task_name}: start")
      info("  - chamber: #{chamber}")
      result = scrape_hearings(chamber)

      info("\n> #{task_name}: finished")
      result
    end

    private

    def scrape_hearings(chamber)
      info("\n> #{task_name}: visit chamber root")
      url = chamber_url(chamber)
      page.visit(url)

      # click the month tab to view all the upcoming hearings
      month_tab = page.first('#CommitteeHearingTabstrip li a', text: 'Month')
      raise Error, "#{task_name}: couldn't find month 'tab'" if month_tab.blank?
      month_tab.click

      scrape_paged_hearings(chamber, url)
    end

    def scrape_paged_hearings(chamber, url, page_number = 0)
      return [] if url.nil?

      info("\n> #{task_name}: visit paged committee hearings")
      info("  - name: #{chamber}")
      info("  - page: #{page_number}")

      # visit page if necessary and wait for it to load
      page.visit(url) if page_number != 0
      wait_for_ajax
      return [] if page.has_css?('.t-no-data')

      # get hearings from each row
      rows = page
        .find_all('#CommitteeHearingTabstrip tbody tr')

      debug("  - hearing rows: #{rows.count}")

      hearings = rows
        .map { |row| build_hearing(row) }
        .compact

      info("  - hearings: #{hearings.count}")

      # aggregate the next page's results if it's available
      next_url = find_next_page_url
      info("  - next?: #{!next_url.nil?}")
      hearings + scrape_paged_hearings(chamber, next_url, page_number + 1)
    end

    def build_hearing(row)
      link = row.first('td.t-last a')

      url = link&.[](:href)
      uri = clean_url(url)

      if uri.nil?
        debug("  - hearing w/o url, link: #{link}")
        return nil
      end

      Hearing.new(
        uri.path.split('/').last.to_i, # ilga_id
        uri.to_s
      )
    end

    # find the next page link by searching for its icon
    def find_next_page_url
      link = page.first(:xpath, "//*[@class='t-arrow-next']/..")
      return nil if link.nil? || link[:class].include?('t-state-disabled')
      link[:href]
    end

    def clean_url(url)
      return nil if url.nil?

      uri = URI.parse(url)
      uri.query = URI.encode_www_form(CGI.parse(uri.query).without('_'))
      uri
    end

    def chamber_url(chamber)
      case chamber
      when Chamber::LOWER
        'http://my.ilga.gov/Hearing/AllHearings?chamber=H'
      when Chamber::UPPER
        'http://my.ilga.gov/Hearing/AllHearings?chamber=S'
      else
        raise "Unknown chamber kind: #{kind}"
      end
    end
  end
end
