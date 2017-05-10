describe 'A bill request', graphql: :request do
  it 'fetches a single bill' do
    bill = create(:bill, :with_any_hearing)

    fields = %w[
      id
      externalId
      documentNumber
      title
      summary
      sponsorName
      detailsUrl
      fullTextUrl
      witnessSlipUrl
      witnessSlipResultUrl
    ]

    query = <<-eos
      query {
        viewer {
          bill(id: "#{bill.id}") {
            #{fields.join("\n")}
          }
        }
      }
    eos

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :bill)
    expect(data.keys).to eq(fields)
  end

  it 'fetches multiple bills' do
    create_list(:bill, 2, :with_any_hearing)

    query = <<-eos
      query {
        viewer {
          bills(first: 1) {
            count
            edges {
              node {
                id
              }
            }
          }
        }
      }
    eos

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    connection = body.dig(:data, :viewer, :bills)
    expect(connection[:count]).to eq(2)
    expect(connection[:edges].length).to eq(1)
  end
end
