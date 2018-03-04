module Ilga
  class ParseHearing
    Hearing = Struct.new(
      :external_id,
      :date,
      :location,
      :is_cancelled,
      :committee
    )

    Committee = Struct.new(
      :external_id,
      :name,
      :hearing
    )

    def call(data)
      hearing_data = data['CommitteeHearing']

      Hearing.new(
        hearing_data['HearingId'],
        parse_date(hearing_data['ScheduledDateTime']),
        data['Location'],
        hearing_data['IsCancelled'],
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

    # reponse dates are in the form 'Date(<millis>)'
    def parse_date(date_string)
      millis_string = date_string[/Date\((\d+)\)/, 1]
      Time.zone.at(millis_string.to_f / 1000.0)
    end
  end
end
