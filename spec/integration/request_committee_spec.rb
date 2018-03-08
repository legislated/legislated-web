describe 'requesting committees', :graph_request do
  it 'fetches a single committee' do
    committee = create(:committee)

    query = <<-QUERY
      query {
        viewer {
          committee(id: "#{committee.id}") {
            id
            name
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :committee)).to be_present
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

    create_list(:committee, 2)
    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :committees, :edges).length).to eq(2)
  end
end
