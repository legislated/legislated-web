describe 'requesting chambers', :graph_request do
  it 'fetches a single chamber' do
    query = <<-QUERY
      query {
        viewer {
          chamber(id: "#{Chamber.first.id}") {
            id
            name
            type
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :chamber)).to be_present
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
    expect(body.dig(:data, :viewer, :chambers, :edges).length).to eq(2)
  end
end
