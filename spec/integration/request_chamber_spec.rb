describe 'requesting chambers', :graph_request do
  it 'fetches a single chamber' do
    chamber = create(:chamber)

    fields = %w[
      id
      name
      type
    ]

    query = <<-QUERY
      query {
        viewer {
          chamber(id: "#{chamber.id}") {
            #{fields.join("\n")}
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :chamber)
    expect(data.keys).to eq(fields)
  end

  it 'fetches multiple chambers' do
    query = <<-QUERY
      query {
        viewer {
          chambers {
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

    nodes = body.dig(:data, :viewer, :chambers, :edges)
    expect(nodes.length).to eq(2)
  end
end
