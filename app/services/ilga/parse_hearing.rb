module Ilga
  class ParseHearing
    Records = Struct.new(
      :hearing,
      :committee
    )

    Hearing = Struct.new(
      :external_id,
      :date,
      :location,
      :is_cancelled
    )

    Committee = Struct.new(
      :external_id,
      :name
    )

    def call(data)
      Records.new(
        build_hearing(data),
        build_committee(data)
      )
    end

    private

    def build_committee(data)
      Committee.new(
        data['CommitteeId'],
        data['CommitteeDescription']
      )
    end

    def build_hearing(data)
      hearing_data = data['CommitteeHearing']

      Hearing.new(
        hearing_data['HearingId'],
        parse_date(hearing_data['ScheduledDateTime']),
        data['Location'],
        hearing_data['IsCancelled']
      )
    end

    # reponse dates are in the form 'Date(<millis>)'
    def parse_date(date_string)
      millis_string = date_string[/Date\((\d+)\)/, 1]
      Time.zone.at(millis_string.to_f / 1000.0)
    end
  end
end
