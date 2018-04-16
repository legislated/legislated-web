class ImportCommittees
  include Worker

  def initialize(
    redis = Redis.new,
    fetch_committees = OpenStates::FetchCommittees.new
  )
    @redis = redis
    @fetch_bills = fetch_committees
  end

  def self.scheduled?
    Time.current.mday == 1
  end

  def perform
    committee_attrs = fetch_committees(fields: fields)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    committee_attrs.each do |attrs|
      Committee.upsert_by!(:os_id, attrs)
    end
  end

  def merge(data, os_id)
    # merge committee table data with data from scraped committee websites
    # update a committee based on the os_id of that committe
    
  end

  private

  attr_reader :redis, :fetch_bills

  def update_membership
    # update the member relation between committee and legislator
  end

end