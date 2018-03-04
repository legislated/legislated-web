describe Ilga::ScrapeHearings do
  subject { described_class.new }

  describe "#call" do
    it "scrapes the hearing links" do
      result = subject.call(Chamber.house.first)
      actual = result.to_json
      expect(actual).to match_json_snapshot('ilga_scrape_hearings')
    end
  end
end
