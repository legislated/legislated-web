class ImportBillsJob
  include Sidekiq::Worker

  def redis
    @redis ||= Redis.new
  end

  def service
    @redis ||= OpenStatesService.new
  end

  def perform
    import_date = redis.get(:import_bills_job_date)&.to_time
    service.fetch_bills(updated_since: import_date)
  end
end
