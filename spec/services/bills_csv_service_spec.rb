describe BillsCsvService do
  subject { described_class.new }

  def csv_row(string)
    string.strip.gsub(/,\s+/, ",")
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
        committee_name
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
          #{bill.hearing.committee.name}
        ")
      end

      expect(rows.drop(1)).to eq(bill_rows)
    end
  end

  describe "#build_bills_query" do
    let!(:date) { bill1.hearing.date + 1.days }
    let!(:bill1) { create(:bill, :with_any_hearing) }
    let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.days)) }
    let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }

    it "only includes bills after or on the datetime" do
      bills = subject.build_bills_query(date).to_a
      expect(bills).to eq([bill2, bill3])
    end
  end

  describe "#default_start_date" do
    it "is last sunday" do
      expect(subject.default_start_date).to eq(Time.now.beginning_of_week(:sunday))
    end
  end
end
