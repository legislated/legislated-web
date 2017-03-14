# use uuids as the default primary key for active record models
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
