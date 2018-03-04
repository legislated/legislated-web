module Ilga
  class ScrapeBill < Scraper
    def call(bill)
      info("> #{task_name}: start")
      info("  - bill: #{bill.id}")
      result = scrape_bill_details(bill)

      info("\n> #{task_name}: finished")
      result
    end

    def scrape_bill_details(bill)
      info("\n> #{task_name}: visit bill details")
      info("  - url: #{bill.details_url}")

      page.visit(bill.details_url)

      # matching based on header text is only way to grab element right now
      summary = page.first(:xpath, "//span[contains(text(),'Synopsis')]/following-sibling::span")
      attrs = {
        summary: summary&.text
      }

      attrs
    end
  end
end
