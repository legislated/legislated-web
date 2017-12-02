class ImportLegislatorsJob
  include Worker

  def self.scheduled?
    Time.current.day == 1
  end

  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end

  def perform
    p "FIELDS FIELDS FIELDS FIELDS"
    p fields
    p "******************"

    legislator_attrs = @open_states_service
      .fetch_legislators(fields: fields)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    legislator_attrs.each do |attrs|
      Legislator.upsert_by!(:os_id, attrs)
    end

    # office_attrs.each do |attrs|
    #   Office.upsert_by!(:os_id, attrs)
    # end
  end

  private

  def parse_attributes(data)
    attrs = {
      os_id: data['leg_id'],
      active: data['active'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      middle_name: data['middle_name'],
      suffixes: data['suffixes'],
      party: data['party'],
      chamber: data['chamber'],
      district: data['district'],
      website_url: data['url'],
      email: data['email'],
      offices: data['offices']
    }

    attrs
  end

  def fields
    legislator_fields
  end

  def office_fields
    @fields ||= begin
      fields = %i[
        type
        name
        address
        phone
        fax
        email
      ]

      fields.join(',')
    end
  end

  def legislator_fields
    @fields ||= begin
      fields = %i[
        id
        leg_id
        active
        first_name
        middle_name
        last_name
        suffixes
        party
        chamber
        district
        url
        email
        offices
      ]

      fields.join(',')
    end
  end
end
