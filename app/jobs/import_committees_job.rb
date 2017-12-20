class ImportCommitteesJob
  include Worker

  def initialize(open_states_service = OpenStatesService.new)
    @open_states_service = open_states_service
  end

  def merge(id)

  end

  private

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


