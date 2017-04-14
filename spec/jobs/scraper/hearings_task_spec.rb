describe Scraper::HearingsTask do
  subject { described_class.new }

  describe '#scrape_committee_hearings' do
    let(:chamber) { build(:chamber) }
    let(:page) { double('page') }
    let(:result) { subject.scrape_committee_hearings(chamber) }
    let(:month_tab) { double('month_tab') }

    before do
      allow(subject).to receive(:page).and_return(page)
      allow(subject).to receive(:scrape_paged_committee_hearings).and_return([])

      allow(page).to receive(:visit)
      allow(page).to receive(:first).and_return(month_tab)

      allow(month_tab).to receive(:click) if month_tab
    end

    it 'visits the committee hearings page' do
      subject.scrape_committee_hearings(chamber)
      expect(page).to have_received(:visit).with(chamber.url)
    end

    it 'scrapes committe hearings for the whole month' do
      subject.scrape_committee_hearings(chamber)
      expect(month_tab).to have_received(:click)
    end

    context 'when there is no month tab' do
      let(:month_tab) { nil }

      it 'raises an error' do
        expect { subject.scrape_committee_hearings(chamber) }.to raise_error(Scraper::Task::Error)
      end
    end
  end

  describe '#scrape_paged_committee_hearings' do
    let(:chamber) { build(:chamber) }
    let(:page) { double('page') }
    let(:result) { subject.scrape_paged_committee_hearings(chamber, chamber.url) }
    let(:rows) { %i[row row] }
    let(:hearings_response) { {} }

    rows_selector = '#CommitteeHearingTabstrip tbody tr'
    link_selector = "//*[@class='t-arrow-next']/.."

    before do
      allow(Scraper::HearingsRequest).to receive(:fetch).and_return(hearings_response)

      allow(subject).to receive(:page).and_return(page)
      allow(subject).to receive(:wait_for_ajax)
      allow(subject).to receive(:build_committee_hearing_attrs).and_return(:committee_hearing)

      allow(page).to receive(:has_css?).with('.t-no-data').and_return(false)
      allow(page).to receive(:find_all).with(rows_selector).and_return(rows)
    end

    context 'normally' do
      let(:next_page_link) { { class: '' } }
      let(:next_page_result) { [:committee_hearing] }

      before do
        allow(subject).to receive(:scrape_paged_committee_hearings)
          .and_call_original
        allow(subject).to receive(:scrape_paged_committee_hearings)
          .with(chamber, anything, 1).and_return(next_page_result)

        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(next_page_link)
      end

      it 'aggregates results from all pages' do
        expect(page).to receive(:find_all).with(rows_selector)
        expect(result).to eq(%i[committee_hearing committee_hearing committee_hearing])
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
        allow(subject).to receive(:scrape_paged_committee_hearings)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return(nil)
      end

      it 'does not page' do
        expect(subject).to receive(:scrape_paged_committee_hearings).once
        expect(result).to eq(%i[committee_hearing committee_hearing])
      end
    end

    context 'when the paging link is disbaled' do
      before do
        allow(subject).to receive(:scrape_paged_committee_hearings)
          .and_call_original
        allow(page).to receive(:first)
          .with(:xpath, link_selector).and_return({ class: 't-state-disabled' })
      end

      it 'does not page' do
        expect(subject).to receive(:scrape_paged_committee_hearings).once
        expect(result).to eq(%i[committee_hearing committee_hearing])
      end
    end
  end

  describe '#build_committee_hearing_attrs' do
    let(:row) { double('row') }
    let(:cols) { [double('column')] }
    let(:result) { subject.build_committee_hearing_attrs(row, committee_hearings_response) }
    let(:committee_id) { Faker::Number.number(5).to_s }
    let(:committee_hearings_response) { Hash[committee_id.to_i, { foo: 'bar' }] }
    let(:hearing_attrs) { { test: 'attrs' } }

    before do
      allow(subject).to receive(:build_committee_attrs).and_return({})
      allow(subject).to receive(:build_hearing_attrs).and_return(hearing_attrs)

      allow(row).to receive(:find_all).and_return(cols)
      allow(cols[0]).to receive(:text).and_return(committee_id)
    end

    it 'joins the committee and hearing attrs' do
      expect(result[:hearing]).to eq(hearing_attrs)
    end

    context 'when the committee id is missing' do
      let(:committee_id) { nil }

      it 'raises an error' do
        expect { result }.to raise_error(Scraper::Task::Error)
      end
    end

    context 'when the response data is missing' do
      let(:committee_hearings_response) { {} }

      it 'skips the row' do
        expect(result).to be_nil
      end
    end
  end

  describe '#build_committee_attrs' do
    let(:attrs) { attributes_for(:committee) }
    let(:result) { subject.build_committee_attrs(cols, committee_hearing_data) }
    let(:cols) { nil }
    let(:committee_hearing_data) {
      { CommitteeId: attrs[:external_id], CommitteeDescription: attrs[:name] }
    }

    it 'returns attributes for the committee' do
      expect(result).to eq(attrs)
    end
  end

  describe '#build_hearing_attrs' do
    let(:cols) { Array.new(4) { double('column') } }
    let(:attrs) { attributes_for(:hearing) }
    let(:result) { subject.build_hearing_attrs(cols, committee_hearing_data) }

    let(:committee_hearing_data) do
      {
        Location: attrs[:location],
        CommitteeHearing: {
          HearingId: attrs[:external_id],
          IsCancelled: attrs[:is_cancelled],
          ScheduledDateTime: attrs[:date]
        }
      }
    end

    before do
      allow(cols[3]).to receive(:find).and_return({ 'href' => attrs[:url] })
      allow(subject).to receive(:parse_response_date) { |date| date }
    end

    it 'returns attributes for hearing' do
      expected_attrs = attrs.slice(:external_id, :url, :location, :is_cancelled, :date)
      expect(result).to eq(expected_attrs)
    end
  end

  describe '#parse_response_date' do
    it 'parses the date string' do
      date = Time.zone.at(1)
      date_string = "Date(#{date.to_datetime.strftime('%Q')})"
      expect(subject.parse_response_date(date_string)).to eq(date)
    end
  end
end
