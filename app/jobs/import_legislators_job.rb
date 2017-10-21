class ImportLegislatorsJob
  include Worker

  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end

  def perform
    legislator_attrs = @open_states_service
      .fetch_legislators(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    legislator_attrs.each do |attrs|
      Legislator.upsert_by!(:os_id, attrs)
    end
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
