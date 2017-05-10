describe GraphWhitelist do
  subject { described_class }

  describe '.call' do
    context 'when not signed-in as an admin' do
      let(:query_context) { { is_admin: false } }

      it 'allows access to any query' do
        expect(subject.call(Types::QueryType, query_context)).to be(true)
      end

      it 'does not allow access to mutations' do
        expect(subject.call(Mutations::MutationType, query_context)).to be(false)
      end
    end

    context 'when signed-in as an admin' do
      let(:query_context) { { is_admin: true } }

      it 'allows access to any query' do
        expect(subject.call(Types::QueryType, query_context)).to be(true)
      end

      it 'does not allow access to mutations' do
        expect(subject.call(Mutations::MutationType, query_context)).to be(true)
      end
    end
  end
end
