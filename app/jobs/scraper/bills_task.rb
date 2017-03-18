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
      info("  - name: #{hearing.committee.name}")
      info("  - page: #{page_number}")

      page.visit(url)

      # short-circuit when there are no rows
      if page.has_css?(".t-no-data")
        return []
      end

      # build bills from each row on this page
      bill_rows = page.find_all("#GridCurrentCommittees tbody tr")
      bills = bill_rows
        .map { |row| build_bill_attrs(row) }
        .compact
      info("  - bills: #{bills.count}")

      # find the next page link by ripping into its icon
      next_page_link = page.first(:xpath, "//*[@class='t-arrow-next']/..")

      # aggregate the next page's results if it's available
      has_next_page = next_page_link.present? && !next_page_link[:class].include?("t-state-disabled")
      info("  - next?: #{has_next_page}")

      if has_next_page
        bills +
          scrape_paged_bills(hearing, next_page_link["href"], page_number + 1)
      else
        bills
      end
    end

    def build_bill_attrs(row)
      # there are ids in hidden columns
      columns = row.find_all("td", visible: false)

      # extract basic information for debugging (if possible)
      external_id = columns[0]&.text(:all)
      document_name = columns[2]&.text

      # short circuit if we can't find a link
      witness_slip_link = row.first(".slipiconbutton")
      if witness_slip_link.blank?
        debug("  - bill missing slip link: #{external_id} - #{document_name}")
      end

      # blow up if we can't find an id for one of the bills
      if external_id.blank?
        raise Error, "#{task_name}: failed to find bill id for row: #{row}"
      end

      # skip sub-bills with hyphens in name for now
      if document_name.include?(" - ")
        debug "- bill is modification: #{external_id} - #{document_name}, skipping"
        return nil
      end

      attrs = {
        external_id: external_id,
        document_name: document_name,
        sponsor_name: columns[3]&.text,
        description: columns[4]&.text,
        witness_slip_url: witness_slip_link.present? ? witness_slip_link["href"] : nil,
      }

      attrs
    end
  end
end
