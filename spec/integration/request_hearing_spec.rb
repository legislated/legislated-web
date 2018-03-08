describe 'requesting hearings', :graph_request do
  it 'fetches a single hearing' do
    hearing = create(:hearing)

    query = <<-QUERY
      query {
        viewer {
          hearing(id: "#{hearing.id}") {
            id
            ilgaId
            location
            date
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :hearing)).to be_present
  end

  it 'fetches multiple hearings' do
    query = <<-QUERY
      query {
        viewer {
          hearings(first: 2) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    QUERY

    create_list(:hearing, 2)
    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :hearings, :edges).length).to eq(2)
  end
end
