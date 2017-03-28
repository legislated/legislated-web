describe BillsCsvService do
  subject { described_class.new }

  def csv_row(string)
    string.strip.gsub(/,$\s+/, ",")
  end

  describe "#serialize" do
    let(:bills) { build_list(:bill, 2, :with_any_hearing) }
    let(:rows) { subject.serialize(bills).split("\n") }

    it "has a header" do
      expect(rows[0]).to eq(csv_row("
        document_number,
        title,
        summary,
        details_url,
        witness_slip_url,
        hearing_date,
        committee_name,
        is_hidden,
        proponent_position,
        opponent_position
      "))
    end

    it "has a row for each bill" do
      bill_rows = bills.map do |bill|
        csv_row("
          #{bill.document_number},
          #{bill.title},
          #{bill.summary},
          #{bill.details_url},
          #{bill.witness_slip_url},
          #{bill.hearing.date},
          #{bill.hearing.committee.name},
          false,
          ,
        ")
      end

      expect(rows.drop(1)).to eq(bill_rows)
    end
  end
end
