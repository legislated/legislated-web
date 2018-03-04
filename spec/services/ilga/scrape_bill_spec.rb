describe Ilga::ScrapeBill do
  subject { described_class.new }

  describe '#scrape_bill_details' do
    let(:bill) { build(:bill) }
    let(:page) { double('page') }
    let(:result) { subject.scrape_bill_details(bill) }

    before do
      allow(subject).to receive(:page).and_return(page)
      allow(page).to receive(:visit)
      allow(page).to receive(:first).and_return(nil)
    end

    it 'visits the bill details page' do
      subject.scrape_bill_details(bill)
      expect(page).to have_received(:visit).with(bill.details_url)
    end

    context 'when the summary does not exist' do
      it 'does not include the summary' do
        expect(result[:summary]).to be_nil
      end
    end

    context 'when the summary exists' do
      let(:summary) { double('summary-element') }

      before do
        allow(page).to receive(:first).and_return(summary)
        allow(summary).to receive(:text).and_return('test')
      end

      it 'includes the summary' do
        expect(result[:summary]).to eq('test')
      end
    end
  end
end
