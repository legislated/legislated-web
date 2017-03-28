describe Bill do
  describe "scopes" do
    describe "by_date" do
      let!(:date) { Time.now }
      let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }
      let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
      let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }

      it "sorts the bills by ascending hearing date" do
        expect(Bill.by_date).to eq([bill1, bill2, bill3])
      end

      context "with a start date" do
        it "only returns bills at or after that date" do
          expect(Bill.by_date(start: date)).to eq([bill2, bill3])
        end
      end

      context "with an end date" do
        it "only returns bills at or before that date" do
          expect(Bill.by_date(end: date)).to eq([bill1, bill2])
        end
      end
    end
  end
end
