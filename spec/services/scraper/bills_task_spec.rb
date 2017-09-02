describe Scraper::BillsTask do
  subject { described_class.new }

  describe '#scrape_paged_bills' do
    let(:hearing) { build(:hearing, :with_any_committee) }
    let(:page) { double('page') }

    def mock_dom
      allow(subject).to receive(:page).and_return(page)
      allow(subject).to receive(:build_bill_attrs).and_return(:bill)

      allow(page).to receive(:visit)
      allow(page).to receive(:first).and_return(nil)
      allow(page).to receive(:find_all).and_return(%i[row row])
      allow(page).to receive(:has_css?).with('.t-no-data').and_return(false)
    end

    def mock_dom_paging(next_page: nil, next_page_link: nil)
      link_selector = "//*[@class='t-arrow-next']/.."

      allow(subject).to receive(:scrape_paged_bills)
        .and_call_original
      allow(subject).to receive(:scrape_paged_bills)
        .with(hearing, anything, 1).and_return(next_page)
      allow(page).to receive(:first)
        .with(:xpath, link_selector).and_return(next_page_link)
    end

    it 'visits the hearing page' do
      mock_dom
      subject.scrape_paged_bills(hearing, hearing.url)
      expect(page).to have_received(:visit).with(hearing.url)
    end

    it 'aggregates results from all pages' do
      mock_dom
      mock_dom_paging(
        next_page: [:bill],
        next_page_link: { class: '' }
      )

      result = subject.scrape_paged_bills(hearing, hearing.url)
      expect(result).to eq(%i[bill bill bill])
    end

    it 'returns nothing when it has no data' do
      mock_dom
      allow(page).to receive(:has_css?).with('.t-no-data').and_return(true)

      result = subject.scrape_paged_bills(hearing, hearing.url)
      expect(result).to eq([])
    end

    it 'does not page when it has no paging link' do
      mock_dom
      mock_dom_paging(next_page_link: nil)

      result = subject.scrape_paged_bills(hearing, hearing.url)
      expect(subject).to have_received(:scrape_paged_bills).once
      expect(result).to eq(%i[bill bill])
    end

    it 'does not page when the paging link is disabled' do
      mock_dom
      mock_dom_paging(next_page_link: { class: 't-state-disabled' })

      result = subject.scrape_paged_bills(hearing, hearing.url)
      expect(subject).to have_received(:scrape_paged_bills).once
      expect(result).to eq(%i[bill bill])
    end
  end

  describe '#build_bill_attrs' do
    let(:row) { double('row') }
    let(:cols) { Array.new(5) { double('column') } }
    let(:attrs) { build(:scraped_bill) }

    def href(url)
      url && { 'href' => url }
    end

    def mock_dom
      slip_link = attrs[:slip_url]

      allow(row).to receive(:find_all).and_return(cols)
      allow(row).to receive(:first).with('.slipiconbutton').and_return(href(attrs[:slip_url]))
      allow(row).to receive(:first).with('.viewiconbutton').and_return(href(attrs[:slip_results_url]))

      allow(cols[0]).to receive(:text).and_return(attrs[:external_id])
      allow(cols[2]).to receive(:text).and_return(attrs[:number])
    end

    it 'returns attributes for the bill/document' do
      mock_dom

      result = subject.build_bill_attrs(row)
      expect(result).to eq(attrs.slice(
        :external_id,
        :number,
        :slip_url,
        :slip_results_url
      ))
    end

    it 'raises an error when the document number is missing' do
      attrs[:number] = nil
      mock_dom
      expect { subject.build_bill_attrs(row) }.to raise_error Scraper::Task::Error
    end

    it 'does not raise as error when optional attributes are mising' do
      attrs[:slip_url] = nil
      attrs[:slip_reuslts_url] = nil
      mock_dom
      expect { subject.build_bill_attrs(row) }.to_not raise_error
    end
  end
end
