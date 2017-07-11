class ImportLegislatorsJob
  include Worker

  def initialize(redis = Redis.new, service = OpenStatesService.new)
    @redis = redis
    @service = service
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
