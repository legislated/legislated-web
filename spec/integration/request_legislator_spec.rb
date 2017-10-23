describe 'requesting legislators', graphql: :request do
  it 'fetches a single legislator' do
    legislator = create(:legislator)

    query = <<-QUERY
      query {
        viewer {
          legislator(id: "#{legislator.id}") {
            id
            osId
            active
            name
            party
            chamber
            district
            websiteUrl
            email
            twitter
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :legislator)
    expect(data).to be_present
  end

  it 'fetches multiple legislators' do
    create_list(:legislator, 2)

    query = <<-QUERY
      query {
        viewer {
          legislators(first: 2) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    connection = body.dig(:data, :viewer, :legislators)
    expect(connection[:edges].length).to eq(2)
  end
end
