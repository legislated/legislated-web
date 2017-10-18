describe 'A hearing request', graphql: :request do
  it 'fetches a single hearing' do
    hearing = create(:hearing, :with_any_committee)

    fields = %w[
      id
      externalId
      location
      date
    ]

    query = <<-QUERY
      query {
        viewer {
          hearing(id: "#{hearing.id}") {
            #{fields.join("\n")}
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :hearing)
    expect(data.keys).to eq(fields)
  end

  it 'fetches multiple hearings' do
    query = <<-QUERY
      query {
        viewer {
          hearings {
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

    nodes = body.dig(:data, :viewer, :hearings, :edges)
    expect(nodes.length).to eq(2)
  end
end
