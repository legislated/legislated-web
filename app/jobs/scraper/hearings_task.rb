module Scraper
  class HearingsTask < Task
    def run(chamber)
      info("> #{task_name}: start")
      info("  - chamber: #{chamber.name}")
      result = scrape_committee_hearings(chamber)

      info("\n> #{task_name}: finished")
      result
    end

    def scrape_committee_hearings(chamber)
      info("\n> #{task_name}: visit chamber root")
      page.visit(chamber.url)

      # click the month tab to view all the upcoming hearings
      month_tab = page.first("#CommitteeHearingTabstrip li a", text: "Month")
      if month_tab.present?
        month_tab.click
      else
        raise Error, "#{task_name}: couldn't find month 'tab'"
      end

      scrape_paged_committee_hearings(chamber, chamber.url)
    end

    def scrape_paged_committee_hearings(chamber, url, page_number = 0)
      info("\n> #{task_name}: visit paged committee hearings")
      info("  - name: #{chamber.name}")
      info("  - page: #{page_number}")

      # we should already be here on page 0
      visit(url) if page_number != 0
      # committee data is pulled in by xhr so we have wait
      wait_for_ajax

      # short-circuit when there are no rows
      if page.has_css?(".t-no-data")
        return []
      end

      # build committee / hearing attribuets, winding together scraped and request data
      committee_hearings_reponse = HearingsRequest.fetch(chamber, page_number)
      committee_hearing_rows = page.find_all("#CommitteeHearingTabstrip tbody tr")
      committee_hearing_attrs = committee_hearing_rows
        .map { |row| build_committee_hearing_attrs(row, committee_hearings_reponse) }
        .compact
      info("  - committee-hearings: #{committee_hearing_attrs.count}")

      # find the next page link by ripping into its icon
      next_page_link = page.first(".t-arrow-next")&.first(:xpath, ".//..")

      # aggregate the next page's results if it's available
      has_next_page = next_page_link.present? && !next_page_link[:class].include?("t-state-disabled")
      info("  - next?: #{has_next_page}")

      if has_next_page
        committee_hearing_attrs +
          scrape_paged_committee_hearings(chamber, next_page_link["href"], page_number + 1)
      else
        committee_hearing_attrs
      end
    end

    def build_committee_hearing_attrs(row, committee_hearings_reponse)
      columns = row.find_all("td", visible: false)

      # validate data
      committee_id = columns[0]&.text(:all)&.to_i
      if committee_id.blank?
        raise Error, "#{taks_name}: failed to find committee id for row #{row}"
      end

      committee_hearing_data = committee_hearings_reponse[committee_id]
      if committee_hearing_data.blank?
        debug("#{task_name}: failed to find response data for committee_id #{committee_id}, skipping")
        return nil
      end

      # build / update models, attaching hearing to committee if necessary
      committee_attrs = build_committee_attrs(columns, committee_hearing_data)
      committee_attrs[:hearing] = build_hearing_attrs(columns, committee_hearing_data)

      committee_attrs
    end

    def build_committee_attrs(columns, committee_hearing_data)
      attrs = {
        external_id: committee_hearing_data[:CommitteeId],
        name: committee_hearing_data[:CommitteeDescription]
      }

      attrs
    end

    def build_hearing_attrs(columns, committee_hearing_data)
      hearing_data = committee_hearing_data[:CommitteeHearing]

      attrs = {
        external_id: hearing_data[:HearingId],
        url: columns[3]&.find("a")["href"],
        location: committee_hearing_data[:Location],
        is_cancelled: hearing_data[:IsCancelled],
        allows_slips: hearing_data[:AllowSlips],
        datetime: parse_response_date(hearing_data[:ScheduledDateTime])
      }

      attrs
    end

    # reponse dates are in the form 'Date(<millis>)'
    def parse_response_date(date_string)
      date_millis_string = date_string[/Date\((\d+)\)/, 1]
      Time.zone.at(date_millis_string.to_f / 1000.0)
    end
  end
end
