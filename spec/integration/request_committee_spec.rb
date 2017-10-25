describe 'requesting committees', graphql: :request do
  it 'fetches a single committee' do
    committee = create(:committee, :with_any_chamber)

    fields = %w[
      id
      externalId
      name
    ]

    query = <<-QUERY
      query {
        viewer {
          committee(id: "#{committee.id}") {
            #{fields.join("\n")}
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :committee)
    expect(data.keys).to eq(fields)
  end

  it 'fetches multiple committees' do
    query = <<-QUERY
      query {
        viewer {
          committees(first: 2) {
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

    nodes = body.dig(:data, :viewer, :committees, :edges)
    expect(nodes.length).to eq(2)
  end
end
