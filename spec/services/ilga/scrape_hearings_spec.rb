describe Ilga::ScrapeHearings do
  subject { described_class.new }

  describe "#call" do
    xit "scrapes the hearing links" do
      result = subject.call(Chamber::LOWER)
      actual = result.to_json
      expect(actual).to match_json_snapshot('ilga_scrape_hearings')
    end
  end
end
