class GraphWhitelist
  def self.call(schema_member, context)
    context[:is_admin] || schema_member != Mutations::MutationType
  end
end
