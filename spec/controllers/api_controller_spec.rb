describe ApiController do
  describe '#execute' do
    let(:env_credentials) { 'test-credentials' }
    let(:credentials) { '' }

    before do
      allow(GraphSchema).to receive(:execute)
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('ADMIN_CREDENTIALS').and_return(env_credentials)

      # rspec-rails is broke https://github.com/rspec/rspec-rails/issues/1655
      request.headers['Authorization'] = credentials
      post :execute, params: {}
    end

    context 'normally' do
      it 'does not set the admin flag' do
        expect(GraphSchema).to have_received(:execute)
          .with(anything, hash_including(context: { is_admin: false }))
      end
    end

    context 'with bad credentials' do
      let(:credentials) { 'foo' }

      it 'does not set the admin flag' do
        expect(GraphSchema).to have_received(:execute)
          .with(anything, hash_including(context: { is_admin: false }))
      end
    end

    context 'with valid credentials' do
      let(:credentials) { env_credentials }

      it 'sets the admin flag' do
        expect(GraphSchema).to have_received(:execute)
          .with(anything, hash_including(context: { is_admin: true }))
      end
    end
  end
end
