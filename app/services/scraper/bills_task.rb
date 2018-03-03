module Scraper
  class BillsTask < Task
    def run(hearing)
      info("> #{task_name}: start")
      info("  - hearing: #{hearing.id}")
      result = scrape_paged_bills(hearing, hearing.url)

      info("\n> #{task_name}: finished")
      result
    end

    def scrape_paged_bills(hearing, url, page_number = 0)
      info("\n> #{task_name}: visit paged bills")
      info("  - name: #{hearing.id}")
      info("  - page: #{page_number}")

      page.visit(url)

      # short-circuit when there are no rows
      return [] if page.has_css?('.t-no-data')

      # build bills from each row on this page
      bill_rows = page.find_all('#GridCurrentCommittees tbody tr')
      bills = bill_rows
        .map { |row| build_bill_attrs(row) }
        .compact

      info("  - bills: #{bills.count}")

      # find the next page link by ripping into its icon
      next_page_link = page.first(:xpath, "//*[@class='t-arrow-next']/..")

      # aggregate the next page's results if it's available
      has_next_page = next_page_link.present? && !next_page_link[:class].include?('t-state-disabled')
      info("  - next?: #{has_next_page}")

      if has_next_page
        bills +
          scrape_paged_bills(hearing, next_page_link['href'], page_number + 1)
      else
        bills
      end
    end

    def build_bill_attrs(row)
      # there are ids in hidden columns
      columns = row.find_all('td', visible: false)

      # scrape required data
      external_id = columns[0]&.text(:all)
      document_number = columns[2]&.text

      assert_exists!(external_id, 'external_id', row)
      assert_exists!(document_number, 'document_number', row)

      # scrape links
      slip_link = row.first('.slipiconbutton')
      slip_results_link = row.first('.viewiconbutton')

      if slip_link.blank?
        debug("  - bill missing slip link: #{external_id} - #{document_number}")
      end

      attrs = {
        external_id: external_id,
        number: document_number,
        slip_url: slip_link&.[]('href'),
        slip_results_url: slip_results_link&.[]('href'),
        is_amendment: document_number.include?(' - ')
      }

      attrs
    end
  end
end
