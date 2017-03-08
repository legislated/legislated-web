require_relative "src/setup"
require_relative "src/scraper"

def main
  scraper = Scraper.new
  scraper.run
end

main
