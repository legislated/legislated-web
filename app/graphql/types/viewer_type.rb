module Types
  ViewerType = GraphQL::ObjectType.define do
    name 'Viewer'
    description 'The top level view of the graph'
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :isAdmin do
      type types.Boolean
      description 'Indicates if the current user is an admin'
      resolve -> (_obj, _args, ctx) { ctx[:is_admin].present? }
    end

    # entities
    field :committee do
      type CommitteeType
      argument :id, !types.ID, 'The graph id of the committee'
      resolve -> (_obj, args, _ctx) { Committee.find(args['id']) }
    end

    field :hearing do
      type HearingType
      argument :id, !types.ID, 'The graph id of the hearing'
      resolve -> (_obj, args, _ctx) { Hearing.find(args['id']) }
    end

    field :bill do
      type BillType
      argument :id, !types.ID, 'The graph id of the bill'
      resolve -> (_obj, args, _ctx) { Bill.find(args['id']) }
    end

    field :legislator do
      type LegislatorType
      argument :id, !types.ID, 'The graph id of the legislator'
      resolve -> (_obj, args, _ctx) { Legislator.find(args['id']) }
    end

    # connections
    connection :committees, CommitteeType.connection_type do
      description 'All committees'
      resolve -> (_obj, _args, _ctx) { Committee.all }
    end

    connection :hearings, HearingType.connection_type do
      description 'All hearings'
      resolve -> (_obj, _args, _ctx) { Hearing.all }
    end

    connection :bills, BillsSearchType do
      description 'All bills'

      argument :params, BillsSearchParamsType

      resolve -> (_obj, args, _ctx) do
        args = args.parse_graphql_data
        BillsSearchCompiler.compile(args[:params] || {})
      end
    end

    connection :legislators, LegislatorType.connection_type do
      description 'All legislators'
      resolve -> (_obj, _args, _ctx) { Legislator.all }
    end
  end
end
