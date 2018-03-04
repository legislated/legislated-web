describe ImportBills do
  subject { described_class.new(mock_redis, mock_open_states_service, mock_step_parser) }

  let(:mock_redis) { double('Redis') }
  let(:mock_open_states_service) { double('OpenStatesService') }
  let(:mock_step_parser) { double('BillsStepParser') }

  describe '#perform' do
    let(:date) { Time.zone.now }

    before do
      Timecop.freeze(date)

      allow(mock_redis).to receive(:get).with(:import_bills_job_date)
      allow(mock_redis).to receive(:set).with(:import_bills_job_date, anything)
      allow(mock_open_states_service).to receive(:fetch_bills).and_return([].lazy)
      allow(mock_step_parser).to receive(:parse).and_return([])

      allow(ImportIlgaBill).to receive(:perform_async)
    end

    after do
      Timecop.return
    end

    it 'fetches bills with the correct fields' do
      subject.perform
      expect(mock_open_states_service).to have_received(:fetch_bills) do |args|
        fields = 'id,bill_id,session,title,chamber,actions,versions,sources,sponsors,type'
        expect(args[:fields]).to eq fields
      end
    end

    it 'fetches bills since the last import' do
      allow(mock_redis).to receive(:get).with(:import_bills_job_date).and_return(date)
      subject.perform
      expect(mock_open_states_service).to have_received(:fetch_bills) do |args|
        expect(args[:updated_since]).to eq date
      end
    end

    it "sets the last import date when it's done" do
      subject.perform
      expect(mock_redis).to have_received(:set).with(:import_bills_job_date, date)
    end

    context 'when upserting' do
      let(:bill) { create(:bill) }
      let(:bill_attrs) { attributes_for(:bill, external_id: bill.external_id) }
      let(:document) { create(:document, bill: bill) }
      let(:document_attrs) { attributes_for(:document, number: document.number) }

      def response(attrs = {})
        base_response = {
          'id' => '',
          'title' => '',
          'bill_id' => '',
          'session' => '',
          'sources' => [{
            'url' => "http://ilga.gov/legislation/BillStatus.asp?LegId=#{bill.external_id}"
          }],
          'actions' => [],
          'sponsors' => [],
          'versions' => []
        }

        Array.wrap(base_response.merge(attrs)).lazy
      end

      describe 'a bill' do
        it 'creates the bill if it does not exist' do
          attrs = attributes_for(:bill)

          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'sources' => [{
              'url' => "http://ilga.gov/legislation/BillStatus.asp?LegId=#{attrs[:external_id]}"
            }]
          ))

          expect { subject.perform }.to change(Bill, :count).by(1)
        end

        it "sets the bill's core attributes" do
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'id' => bill_attrs[:os_id],
            'title' => bill_attrs[:title],
            'bill_id' => document_attrs[:number].gsub(/[A-Z]+/, '\0 '),
            'session' => "#{bill_attrs[:session_number]}th"
          ))

          subject.perform
          expect(bill.reload).to have_attributes(bill_attrs.slice(
            :os_id,
            :title,
            :document_number,
            :session_number
          ))
        end

        it "sets the bill's source-url derived attributes" do
          query = 'DocNum=1234&DocTypeID=SB&GAID=2&SessionID=3'

          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'sources' => [{
              'url' => "http://ilga.gov/legislation/BillStatus.asp?LegId=#{bill_attrs[:external_id]}&#{query}"
            }]
          ))

          subject.perform
          expect(bill.reload).to have_attributes(
            external_id: bill_attrs[:external_id],
            details_url: "http://www.ilga.gov/legislation/billstatus.asp?#{query}"
          )
        end

        it "sets the bill's primary sponsor name" do
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'sponsors' => [{
              'type' => 'primary',
              'name' => bill_attrs[:sponsor_name]
            }]
          ))

          subject.perform
          expect(bill.reload).to have_attributes(bill_attrs.slice(
            :sponsor_name
          ))
        end

        it "sets the bill's actions" do
          actions = %w[action1 action2]
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'actions' => actions
          ))

          subject.perform
          expect(bill.reload).to have_attributes({
            actions: actions
          })
        end

        it "sets the bill's stages" do
          steps = [{ actor: 'actor-1' }, { actor: 'actor-2' }]
          allow(mock_step_parser).to receive(:parse).and_return(steps)
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response)

          subject.perform
          expect(bill.reload.steps.pluck('actor')).to eq(steps.pluck(:actor))
        end

        it 'imports details for the bill' do
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response)
          subject.perform
          expect(ImportIlgaBill).to have_received(:perform_async).exactly(1).times
        end
      end

      describe 'a document' do
        it 'creates the document if it does not exist' do
          attrs = attributes_for(:bill, :with_documents)
          doc_attrs = attrs[:documents].first

          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'bill_id' => doc_attrs[:number],
            'versions' => [{}],
            'sources' => [{
              'url' => "http://ilga.gov/legislation/BillStatus.asp?LegId=#{attrs[:external_id]}"
            }]
          ))

          expect { subject.perform }.to change(Document, :count).by(1)
        end

        it "sets the document's core attributes" do
          allow(mock_open_states_service).to receive(:fetch_bills).and_return(response(
            'bill_id' => document_attrs[:number],
            'versions' => [{
              'doc_id' => document_attrs[:os_id],
              'url' => document_attrs[:full_text_url]
            }]
          ))

          subject.perform
          expect(document.reload).to have_attributes(document_attrs.slice(
            :os_id,
            :number,
            :full_text_url
          ))
        end
      end
    end
  end
end
