describe 'requesting legislators', :graph_request do
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
    expect(body.dig(:data, :viewer, :legislator)).to be_present
  end

  it 'fetches multiple legislators' do
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

    create_list(:legislator, 2)
    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :legislators, :edges).length).to eq(2)
  end
end
