describe Scraper::BillsTask do
  subject { described_class.new }

  describe '#scrape_paged_bills' do
    let(:hearing) { build(:hearing, :with_any_committee) }
    let(:page) { double('page') }
    let(:result) { subject.scrape_paged_bills(hearing, hearing.url) }
    let(:rows) { %i[row row] }

    rows_selector = '#GridCurrentCommittees tbody tr'
    link_selector = "//*[@class='t-arrow-next']/.."

    before do
      allow(subject).to receive(:page).and_return(page)
      allow(subject).to receive(:build_bill_attrs).and_return(:bill)

      allow(page).to receive(:visit)
      allow(page).to receive(:first).and_return(nil)
      allow(page).to receive(:find_all).and_return(rows)
      allow(page).to receive(:has_css?).with('.t-no-data').and_return(false)
    end

    it 'visits the hearing page' do
      subject.scrape_paged_bills(hearing, hearing.url)
      expect(page).to have_received(:visit).with(hearing.url)
    end

    context 'normally' do
      let(:next_page_link) { { class: '' } }
      let(:next_page_result) { [:bill] }

      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(subject).to receive(:scrape_paged_bills)
          .with(hearing, anything, 1).and_return(next_page_result)

        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(next_page_link)
      end

      it 'aggregates results from all pages' do
        expect(page).to receive(:find_all).with(rows_selector)
        expect(result).to eq(%i[bill bill bill])
      end
    end

    context 'when it has no data' do
      before do
        allow(page).to receive(:has_css?)
          .with('.t-no-data').and_return(true)
      end

      it 'returns nothing' do
        expect(result).to eq([])
      end
    end

    context 'when it has no paging link' do
      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(nil)
      end

      it 'does not page' do
        expect(subject).to receive(:scrape_paged_bills).once
        expect(result).to eq(%i[bill bill])
      end
    end

    context 'when the paging link is disbaled' do
      before do
        allow(subject).to receive(:scrape_paged_bills)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return({ class: 't-state-disabled' })
      end

      it 'does not page' do
        expect(subject).to receive(:scrape_paged_bills).once
        expect(result).to eq(%i[bill bill])
      end
    end
  end

  describe '#build_bill_attrs' do
    let(:row) { double('row') }
    let(:cols) { Array.new(5) { double('column') } }
    let(:result) { subject.build_bill_attrs(row) }
    let(:attrs) { attributes_for(:bill) }

    let(:external_id) { attrs[:external_id] }
    let(:document_number) { attrs[:document_number] }
    let(:witness_slip_link) { { 'href' => attrs[:witness_slip_url] } }
    let(:witness_slip_result_link) { { 'href' => attrs[:witness_slip_result_url] } }

    before do
      allow(row).to receive(:find_all).and_return(cols)
      allow(row).to receive(:first).with('.slipiconbutton').and_return(witness_slip_link)
      allow(row).to receive(:first).with('.viewiconbutton').and_return(witness_slip_result_link)

      allow(cols[0]).to receive(:text).and_return(external_id)
      allow(cols[2]).to receive(:text).and_return(document_number)
      allow(cols[3]).to receive(:text).and_return(attrs[:sponsor_name])
      allow(cols[4]).to receive(:text).and_return(attrs[:title])
    end

    it 'returns attributes for the bill' do
      expected_attrs = attrs.slice(
        :external_id,
        :witness_slip_url,
        :witness_slip_result_url
      )

      expect(result).to eq(expected_attrs)
    end

    context 'when the id is missing' do
      let(:external_id) { nil }

      it 'raises an error' do
        expect { subject.build_bill_attrs(row) }.to raise_error Scraper::Task::Error
      end
    end

    context "when the document appears to be an 'amendment'" do
      let(:document_number) { 'HB0000 - Amendment' }

      it 'skips the row' do
        expect(result).to be_nil
      end
    end

    context 'when the witness slip link is missing' do
      let(:witness_slip_link) { nil }

      it 'returns nil for the witness slip url' do
        expect(result[:witness_slip_url]).to be_nil
      end
    end

    context 'when the witness slip result link is missing' do
      let(:witness_slip_result_link) { nil }

      it 'returns nil for the witness slip result url' do
        expect(result[:witness_slip_result_url]).to be_nil
      end
    end
  end
end
