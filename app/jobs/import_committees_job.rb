class ImportCommitteesJob
  include Worker

  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end

  def self.scheduled?
    Time.current.saturday?
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

  def merge(id)
    # update committee table with data from scraped committee websites
  end

  private

  def update_membership
    # update the member relation between committee and legislator
  end

  def parse_attributes(data)
    attrs = {

    }

    attrs
  end

  def fields
    @fields ||= begin
      fields = %i [
        stuff
      ]

      fields.join(',')
    end
  end


