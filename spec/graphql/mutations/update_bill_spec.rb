describe Mutations::UpdateBill, graphql: :type do
  subject { described_class }

  describe 'when not signed-in as an admin' do
    it 'throws an authorization error' do
      expect do
        mutate(ctx: { is_admin: false })
      end.to raise_error(Errors::AuthorizationError)
    end
  end

  describe 'when signed-in as an admin' do
    it 'raises a not found error if the bill does not exist' do
      expect do
        mutate(args: { id: 'fake-id' }, ctx: { is_admin: true })
      end.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'updates the bill' do
      bill = create(:bill, :with_any_hearing)

      mutate({
        args: { id: bill.id, humanSummary: 'Fleece sweaters for all.' },
        ctx: { is_admin: true }
      })

      bill.reload
      expect(bill.human_summary).to eq('Fleece sweaters for all.')
    end
  end
end
