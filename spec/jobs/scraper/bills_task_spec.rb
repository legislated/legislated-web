describe Scraper::BillsTask do
  subject { described_class.new }

  describe "#scrape_paged_bills" do
    let(:hearing) { build(:hearing, :with_any_committee) }
    let(:page) { double("page") }
    let(:result) { subject.scrape_paged_bills(hearing, hearing.url) }
    let(:rows_page1) { [:row, :row] }

    rows_selector = "#GridCurrentCommittees tbody tr"
    link_selector = "//*[@class='t-arrow-next']/.."

    before do
      allow(subject).to receive(:page).and_return(page)
      allow(subject).to receive(:build_bill_attrs).and_return(:bill)

      allow(page).to receive(:visit)
      allow(page).to receive(:first).and_return(nil)
      allow(page).to receive(:find_all).and_return(rows_page1)
      allow(page).to receive(:has_css?).with(".t-no-data").and_return(false)
    end

    it "visits the hearing page" do
      subject.scrape_paged_bills(hearing, hearing.url)
      expect(page).to have_received(:visit).with(hearing.url)
    end

    context "normally" do
      let(:bills_page2) { [:bill] }
      let(:next_page_link) { { class: "" } }

      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(subject).to receive(:scrape_paged_bills)
          .with(anything, anything, 1).and_return(bills_page2)

        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(next_page_link)
      end

      it "aggregates results from all pages" do
        expect(page).to receive(:find_all).with(rows_selector)
        expect(result).to eq([:bill, :bill, :bill])
      end
    end

    context "when it has no data" do
      before do
        allow(page).to receive(:has_css?)
          .with(".t-no-data").and_return(true)
      end

      it "returns nothing" do
        expect(result).to eq([])
      end
    end

    context "when it has no paging link" do
      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(nil)
      end

      it "does not page" do
        expect(subject).to receive(:scrape_paged_bills).once.and_call_original
        expect(result).to eq([:bill, :bill])
      end
    end

    context "when the paging link is disbaled" do
      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return({ class: "t-state-disabled" })
      end

      it "does not page" do
        expect(subject).to receive(:scrape_paged_bills).once
        expect(result).to eq([:bill, :bill])
      end
    end
  end
end
