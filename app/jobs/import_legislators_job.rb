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
      Legislator.upsert_by!(:os_id, attrs)
    end

    @redis.set(:import_legislators_job_date, Time.zone.now)
  end

  private

  def parse_attributes(data)
    attrs = {
      os_id: data['leg_id'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      email: data['email'],
      district: data['district'],
      chamber: data['chamber']
    }

    attrs
  end

  def fields
    @fields ||= begin
      fields = %i[
        id
        leg_id
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
