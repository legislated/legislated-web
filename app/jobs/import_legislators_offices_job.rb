class ImportLegislatorsJob
  include Worker

	# Probably fine??  
  def self.scheduled?
    Time.current.day == 1
  end

  # Looks right?
  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end


  def perform
    office_attrs = @open_states_service
      .fetch_legislators(fields: fields)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    office_attrs.each do |attrs|
      Legislator.upsert_by!(:os_id, attrs)
    end
  end

  private

		# type ‘capitol’ or ‘district’
		# name Name of the address (e.g. ‘Council Office’, ‘District Office’)
		# address Street address.
		# phone Phone number.
		# fax Fax number.
		# email Email address. Any of these fields may be ``null`` if not found.

  def parse_attributes(data)
    attrs = {
      # os_id: data['leg_id'],
      # active: data['active'],
      # first_name: data['first_name'],
      # last_name: data['last_name'],
      # middle_name: data['middle_name'],
      # suffixes: data['suffixes'],
      # party: data['party'],
      # chamber: data['chamber'],
      # district: data['district'],
      # website_url: data['url'],
      location: data['type'],
      building: data['name'],
      address: data['address'],
      phone: data ['phone'],
      fax: data ['fax'],
      email: data['email']
    }

    attrs
  end

  def fields
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

end
