describe 'A chamber request', graphql: :request do
  it 'fetches a single chamber' do
    chamber = create(:chamber)

    fields = %w[
      id
      name
      type
    ]

    query = <<-eos
      query {
        viewer {
          chamber(id: "#{chamber.id}") {
            #{fields.join("\n")}
          }
        }
      }
    eos

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    data = body.dig(:data, :viewer, :chamber)
    expect(data.keys).to eq(fields)
  end

  it 'fetches multiple chambers' do
    query = <<-eos
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
    eos

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank

    nodes = body.dig(:data, :viewer, :chambers, :edges)
    expect(nodes.length).to eq(2)
  end
end
