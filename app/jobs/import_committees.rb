class ImportCommittees
  include Worker

  def initialize(
    redis = Redis.new,
    fetch_committees = OpenStates::FetchCommittees.new
  )
    @redis = redis
    @fetch_committees = fetch_committees
  end

  def self.scheduled?
    Time.current.mday == 1
  end

  def perform
    committees = fetch_committees.call

    committees.each do |data|
      Committee.upsert_by!(:os_id, data.to_h)
    end
  end

  def merge(data, os_id)
    # merge committee table data with data from scraped committee websites
    # update a committee based on the os_id of that committe
  end

  private

  attr_reader :redis, :fetch_committees

  def update_membership
    # update the member relation between committee and legislator
  end

end