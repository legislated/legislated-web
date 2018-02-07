describe OpenStatesService do
  subject { described_class.new }

  let(:klass) { subject.class }
  let(:api_key) { SecureRandom.uuid }

  it 'has the correct base url' do
    expect(klass.base_uri).to eq('https://openstates.org/api/v1')
  end

  describe '#fetch_bills' do
    def fetch_bills(params = {})
      subject.fetch_bills(params).to_a
    end

    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('OPEN_STATES_KEY').and_return(api_key)
      allow(klass).to receive(:get)
    end

    it 'requests the correct endpoint' do
      fetch_bills
      expect(klass).to have_received(:get).with('/bills', any_args)
    end

    it 'requests the correct headers' do
      fetch_bills
      expect(klass).to have_received(:get).with(anything, hash_including({
        headers: {
          'X-API-KEY': api_key
        }
      }))
    end

    it 'requests paged bills by state and session' do
      fetch_bills
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: {
          state: 'il',
          search_window: 'session',
          page: 1,
          per_page: 50
        }
      }))
    end

    it 'serializes date parameters' do
      date = Date.new(1995, 3, 1)
      Timecop.freeze(date)

      fetch_bills(updated_since: date)
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: hash_including({
          updated_since: '1995-03-01'
        })
      }))

      Timecop.return
    end

    it 'applies additional query parameters' do
      fetch_bills(extra: 'parameter')
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: hash_including(extra: 'parameter')
      }))
    end

    it 'enumerates all the pages of bills' do
      pages = [[1, [:a]], [2, [:b]], [3, nil]]
      pages.each do |number, page|
        query = hash_including({
          query: hash_including(page: number)
        })

        allow(klass).to receive(:get).with(anything, query).and_return(page)
      end

      expect(fetch_bills).to eq(%i[a b])
    end
  end

  describe '#fetch committees' do
    def fetch_committees(params ={})
      subject.fetch_committees(params).to a
    end

    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('OPEN_STATES_KEY').and_return(api_key)
      allow(klass).to receive(:get)
    end

    it 'requests the correct endpoint' do
      fetch_committees
      expect(klass).to have_received(:get).with('/committees', any_args)
    end

    it 'requests the correct headers' do
      fetch_committees
      expect(klass).to have_received(:get).with(anything, hash_including({
        headers: {
          'X-API-KEY': api_key
        }
      }))
    end

    it 'requests committees by state' do
      fetch_committees
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: {
          state: 'il',
          search_window: 'session'
        }
      }))
    end

    it 'applies additional query parameters' do
      fetch_committees(extra: 'parameter')
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: hash_including(extra: 'parameter')
      }))
    end
  end
end
