describe Ilga::ScrapeHearingBills do
  subject { described_class.new }

  describe "#call" do
    it "scrapes the hearing bills" do
      hearing = build(:hearing, {
        url: 'http://my.ilga.gov/Hearing/HearingDetail/15597'
      })

      result = subject.call(hearing)
      actual = result.to_json
      expect(actual).to match_json_snapshot('ilga_scrape_hearing_bills')
    end
  end
end
