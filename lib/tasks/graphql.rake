namespace :graphql do
  desc "Generate graphQL schema.json"
  task :schema => :environment do
    puts "○ graphql:schema - regenerating schema.json..."
    schema_data = GraphSchema.execute(GraphQL::Introspection::INTROSPECTION_QUERY)
    pretty_json = JSON.pretty_generate(schema_data)
    File.open("schema.json", "w") { |f| f.write(pretty_json) }
    puts "✔ graphql:schema - saved schema.json"
    puts ""
  end
end
