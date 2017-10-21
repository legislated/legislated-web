describe 'requesting a bill update', graphql: :request do
  it 'updates the bill' do
    bill = create(:bill, :with_any_hearing)

    query = <<-QUERY
      mutation($input: UpdateBillInput!) {
        updateBill(input: $input) {
          clientMutationId
          bill {
            id
            humanSummary
          }
        }
      }
    QUERY

    variables = {
      input: {
        id: bill.id,
        humanSummary: "It's all there on paper"
      }
    }

    body = request_graph_query(query, variables: variables, is_admin: true)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :updateBill, :bill)
    expect(data[:humanSummary]).to eq(variables.dig(:input, :humanSummary))
  end
end
