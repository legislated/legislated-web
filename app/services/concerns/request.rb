module Request
  extend ActiveSupport::Concern

  included do
    include HTTParty
  end

  def fetch_pages
    enumerator = Enumerator.new do |item|
      page_number = 1

      loop do
        page = yield(page_number)
        break if page.blank?
        page_number += 1
        page.each { |record| item.yield(record) }
      end
    end

    enumerator.lazy
  end
end
