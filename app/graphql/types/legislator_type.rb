module Types
  LegislatorType = GraphQL::ObjectType.define do
    name 'Legislator'
    description 'A legislator'
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :osId, !types.String, 'The OpenStates id', property: :os_id
    field :active, !types.Boolean, 'Whether or not the legislator is in office'
    field :name, !types.String, 'The full display name' do
      resolve -> (leg, _args, _ctx) {
        "#{leg.first_name} #{leg.middle_name} #{leg.last_name} #{leg.suffixes}"
      }
    end

    field :party, !types.String, 'The affialiated political party'
    field :chamber, !types.String, 'The affialiated legislative chamber district'
    field :district, !types.String, 'The affialiated congressional district'

    field :websiteUrl, types.String, "The url of the legislator's official website", property: :website_url
    field :email, types.String, 'The e-mail address'
    field :twitter, types.String, 'The twitter handle'
  end
end
