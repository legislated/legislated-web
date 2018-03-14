describe Bills::SerializeCsv do
  subject { described_class.new }

  def csv_row(string)
    string.strip.gsub(/,$\s+/, ',')
  end

  describe '#call' do
    let(:committee) { build(:committee, name: 'no-comma') }

    let(:bills) do
      build_list(:bill, 2, :with_documents, {
        hearing: build(:hearing, {
          committee: committee
        })
      })
    end

    it 'has a header' do
      actual = subject.call(bills).split("\n")

      expect(actual[0]).to eq(csv_row("
        document_number,
        title,
        summary,
        details_url,
        witness_slip_url,
        hearing_date,
        committee_name,
        priority,
        human_summary,
        proponent_position,
        opponent_position
      "))
    end

    it 'has a row for each bill' do
      expected = bills.map do |bill|
        csv_row("
          #{bill.document&.number},
          #{bill.title},
          #{bill.summary},
          #{bill.details_url},
          #{bill.document&.slip_url},
          #{bill.hearing.date},
          #{bill.hearing.committee.name},
          1,
          ,
          ,
        ")
      end

      actual = subject.call(bills).split("\n")
      expect(actual.drop(1)).to eq(expected)
    end
  end
end
