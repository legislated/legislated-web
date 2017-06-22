class ImportBillsJob
  include Sidekiq::Worker

  def redis
    @redis ||= Redis.new
  end

  def service
    @service ||= OpenStatesService.new
  end

  def perform
    import_date = redis.get(:import_bills_job_date)&.to_time

    # ids = [100728, 102378, 104554, 103715, 103990, 104523, 100389, 104123, 100831, 101028]
    #   .map { |id| "ILB00#{id}" }
    #   .reduce { |memo, id| "#{memo}|#{id}" }

    bills = service.fetch_bills({
      fields: fields,
      # bill_id__in: ids,
      updated_since: import_date
    })

    redis.set(:import_bills_job_date, Time.zone.now)
  end

  def fields
    @fields ||= join(
      :id,
      :bill_id,
      :session
      :title,
      :chamber,
      :sources,
      :sponsors,
      :type
    ])
  end
end
