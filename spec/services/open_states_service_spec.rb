describe OpenStatesService do
  subject { described_class.new }

  let(:klass) { subject.class }
  let(:api_key) { SecureRandom.uuid }

  it 'has the correct base url' do
    expect(klass.base_uri).to eq('https://openstates.org/api/v1')
  end

  describe '#fetch_bills' do
    before do
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('OPEN_STATES_KEY').and_return(api_key)
      allow(klass).to receive(:get)
    end

    it 'requests the correct endpoint' do
      subject.fetch_bills
      expect(klass).to have_received(:get).with('/bills', any_args)
    end

    it 'has the correct headers' do
      subject.fetch_bills
      expect(klass).to have_received(:get).with(anything, hash_including({
        headers: {
          'X-API-KEY': api_key
        }
      }))
    end

    it 'requests paged bills by state' do
      subject.fetch_bills
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: {
          state: 'il',
          page: 1,
          per_page: 50
        }
      }))
    end

    it 'applies additional query parameters' do
      subject.fetch_bills(extra: 'parameter')
      expect(klass).to have_received(:get).with(anything, hash_including({
        query: hash_including(extra: 'parameter')
      }))
    end

    it 'aggregates all the pages of bills' do
      pages = [[1, [:a]], [2, [:b]], [3, nil]]
      pages.each do |number, page|
        query = hash_including({
          query: hash_including(page: number)
        })

        allow(klass).to receive(:get).with(anything, query).and_return(page)
      end

      bills = subject.fetch_bills
      expect(bills).to eq(%i[a b])
    end
  end
end
