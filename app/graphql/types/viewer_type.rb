module Types
  ViewerType = GraphQL::ObjectType.define do
    name "Viewer"
    description "The top level view of the graph"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    connection :chambers, -> { ChamberType.connection_type } do
      description "All chambers"
      resolve -> (obj, ctx, args) { Chamber.all }
    end

    connection :committees, -> { CommitteeType.connection_type } do
      description "All committees"
      resolve -> (obj, ctx, args) { Committee.all }
    end

    connection :hearings, -> { HearingType.connection_type } do
      description "All hearings"
      resolve -> (obj, ctx, args) { Hearing.all }
    end

    connection :bills, -> { BillType.connection_type } do
      description "All bills"
      resolve -> (obj, ctx, args) { Bill.all }
    end
  end
end
