describe Types::ViewerType do
  subject { described_class }

  describe "#bills" do
    let(:resolve) { subject.fields["bills"].resolve_proc.instance_variable_get("@underlying_resolve") }

    let(:args) { { } }
    let(:result) { resolve.call(nil, args, nil) }

    let!(:date) { Time.now }
    let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }
    let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
    let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }

    it "sorts bills by date" do
      expect(result).to eq([bill1, bill2, bill3])
    end

    context "with a date range" do
      let(:args) { { from: date, to: date } }

      it "only returns bills after that date" do
        expect(result).to eq([bill2])
      end
    end
  end
end
