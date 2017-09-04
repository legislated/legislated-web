class ImportLegislatorsJob
  include Worker

  def initialize(redis = Redis.new, service = OpenStatesService.new)
    @redis = redis
    @service = service
  end

  def perform
    import_date = @redis.get(:import_legislators_job_date)&.to_time

    legislator_attrs = @service
      .fetch_legislators(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    legislator_attrs.each do |attrs|
      bill = Bill.upsert_by!(:external_id, attrs)
      # enqueue the details import
      ImportBillDetailsJob.perform_async(bill.id)
    end
  end

  def fields
    @fields ||= begin
      fields = %i[
        external_id
        os_id
        first_name
        last_name
        email
        phone_number
        twitter_username
        district
        chamber
      ]

      fields.join(',')
    end
  end
end
