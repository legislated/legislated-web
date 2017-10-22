require 'pry'
require 'helpers/graph_type_helpers'
require 'helpers/graph_request_helpers'
require 'helpers/json_snapshot_helpers'

RSpec.configure do |config|
  config.include JsonSnapshotHelpers::Example, :json_snapshot
  config.include GraphRequestHelpers::Example, graphql: :request
  config.include GraphTypeHelpers::Example, graphql: :type
  config.extend GraphTypeHelpers::Group, graphql: :type

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
