describe Scraper::HearingsRequest do
  subject { described_class }

  describe '#fetch' do
    let(:chamber) { Chamber.find_by(kind: :house) }
    let(:date) { Time.zone.local(1990, 1, 1) }
    let(:committee) { { 'CommitteeId' => 1 } }
    let(:response) { { 'data' => [committee] } }
    let(:result) { subject.fetch(chamber, 0) }

    before do
      Timecop.freeze(date)
      allow(HTTParty).to receive(:post).and_return(response)
    end

    after do
      Timecop.return
    end

    it 'uses the correct url' do
      subject.fetch(chamber, 0)
      expect(HTTParty).to have_received(:post).with(
        'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange', anything
      )
    end

    it 'uses the correct query parameters' do
      subject.fetch(chamber, 0)
      expect(HTTParty).to have_received(:post) do |_, options|
        query = options[:query]
        expect(query).to eq({
          chamber: 'H',
          committeeid: 0,
          begindate: '01/01/90 00:00:00',
          enddate: '01/31/90 00:00:00'
        })
      end
    end

    it 'uses the correct page' do
      subject.fetch(chamber, 1)
      expect(HTTParty).to have_received(:post) do |_, options|
        body = options[:body]
        expect(body[:page]).to eq(2)
      end
    end

    it 'maps the committees by id' do
      expect(result[1]).to eq(committee)
    end
  end
end
