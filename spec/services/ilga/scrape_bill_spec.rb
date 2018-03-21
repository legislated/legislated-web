describe Ilga::ScrapeBill do
  subject { described_class.new }

  describe "#call" do
    it "scrapes the bill details" do
      bill = build(:bill, {
        details_url: 'http://www.ilga.gov/legislation/billstatus.asp?DocNum=4167&GAID=14&DocTypeID=HB&SessionID=91'
      })

      result = subject.call(bill)
      actual = result.to_json
      expect(actual).to match_json_snapshot('ilga_scrape_bill')
    end
  end
end
