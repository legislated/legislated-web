describe ImportHearingBills do
  subject { described_class.new(mock_scraper) }

  let(:mock_scraper) { double('Scraper') }

  describe '#perform' do
    let(:hearing) { create(:hearing) }

    def mock_response(response = [])
      allow(mock_scraper).to receive(:run).and_return(response)
    end

    it "raises a not found error when the hearing doesn't exist" do
      expect { subject.perform(SecureRandom.uuid) }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it "scrapes the hearing's bills" do
      mock_response
      subject.perform(hearing.id)
      expect(mock_scraper).to have_received(:run).with(hearing)
    end

    it 'updates bills that already exist' do
      bill = create(:bill, hearing: Hearing.second)
      bill_attrs = build(:scraped_bill, external_id: bill.external_id)
      mock_response([bill_attrs])

      subject.perform(hearing.id)
      expect(bill.reload.hearing).to eq(hearing)
    end

    it "creates bills that don't exist" do
      response = build_list(:scraped_bill, 2)
      mock_response(response)
      expect { subject.perform(hearing.id) }.to change(Bill, :count).by(2)
    end

    it 'updates documents that already exist' do
      document = create(:document, :with_bill)
      bill = create(:bill, hearing: hearing)
      bill_attrs = build(:scraped_bill, external_id: bill.external_id, number: document.number)
      mock_response([bill_attrs])

      expected_attrs = bill_attrs.except(:external_id).merge(bill: bill)
      subject.perform(hearing.id)
      expect(document.reload).to have_attributes(expected_attrs)
    end

    it "creates documents that don't exist" do
      response = build_list(:scraped_bill, 2)
      mock_response(response)
      expect { subject.perform(hearing.id) }.to change(Document, :count).by(2)
    end
  end
end
