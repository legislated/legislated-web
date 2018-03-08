describe 'requesting bills', :graph_request do
  it 'fetches a single bill' do
    bill = create(:bill, :with_documents, :with_steps)

    query = <<-QUERY
      query {
        viewer {
          bill(id: "#{bill.id}") {
            id
            ilgaId
            title
            summary
            humanSummary
            sponsorName
            detailsUrl
            documents {
              id
              number
              fullTextUrl
              slipUrl
              slipResultsUrl
              isAmendment
            }
            steps {
              actor
              action
              resolution
              date
            }
          }
        }
      }
    QUERY

    body = request_graph_query(query)
    expect(body[:errors]).to be_blank
    expect(body.dig(:data, :viewer, :bill)).to be_present
  end

  it 'fetches multiple bills' do
    create_list(:bill, 3)

    query = <<-QUERY
      query {
        viewer {
          bills(first: 2) {
            count
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

    connection = body.dig(:data, :viewer, :bills)
    expect(connection[:count]).to eq(3)
    expect(connection[:edges].length).to eq(2)
  end
end
