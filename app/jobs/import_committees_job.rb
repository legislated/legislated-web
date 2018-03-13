class ImportCommitteesJob
  include Worker

  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end

  def self.scheduled?
    Time.current.mday==1
  end

  def perform
    committee_attrs = @open_states_service
      .fetch_committees(fields: fields)
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

  def update_membership
    # update the member relation between committee and legislator
  end

  def parse_attributes(data)
    attrs = {
      od_id: data['id'],
      name: data['committee'],
      chamber: data['chamber'],
      subcommittee: data['subcommittee']
    }

    attrs
  end

  def fields
    @fields ||= begin
      fields = %i [
        id
        chamber
        committee
        sources
        members
      ]

      fields.join(',')
    end
  end
end


 