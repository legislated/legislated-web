module Scraper
  class BillDetailsTask < Task
    def run(bill)
      info("> #{task_name}: start")
      info("  - bill: #{bill.id}")
      result = scrape_bill_details(bill)

      info("\n> #{task_name}: finished")
      result
    end

    def scrape_bill_details(bill)
      info("\n> #{task_name}: visit bill details")
      info("  - url: #{bill.url}")

      visit(bill.url)

      # matching based on header text is only way to grab element right now
      synopsis = page.first(:xpath, "//span[contains(text(),'Synopsis')]/following-sibling::span")
      attrs = {
        synopsis: synopsis&.text
      }

      attrs
    end
  end
end
