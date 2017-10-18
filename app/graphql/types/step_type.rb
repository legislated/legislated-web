module Types
  StepType = GraphQL::ObjectType.define do
    name 'Step'
    description 'A procedural step for a bill'

    # fields
    field :actor, !(GraphQL::EnumType.define {
      name 'StepActor'
      description 'The governing body that took this step'

      value 'LOWER', 'The lower chamber (House)', value: 'lower'
      value 'LOWER_COMMITTEE', 'A committee in the lower chamber', value: 'lower:committee'
      value 'UPPER', 'The upper chamber (Senate)', value: 'upper'
      value 'UPPER_COMMITTEE', 'A committee in the upper chamber', value: 'upper:committee'
      value 'GOVERNOR', 'The governor', value: 'governor'
    })

    field :action, !(GraphQL::EnumType.define {
      name 'StepAction'
      description 'The actions an actor can take'

      value 'INTRODUCED', 'The actor introduced the bill', value: 'introduced'
      value 'RESOLVED', 'The actor resolved the bill', value: 'resolved'
    })

    field :resolution, !(GraphQL::EnumType.define {
      name 'StepResolution'
      description 'The resolutions for an action can have'

      value 'PASSED', 'The bill passed a vote', value: 'passed'
      value 'FAILED', 'The bill failed a vote', value: 'failed'
      value 'SIGNED', 'The governor signed the bill', value: 'signed'
      value 'VETOED', 'The governor vetoed the bill', value: 'vetoed'
      value 'VETOED_LINE', 'The governor line-item vetoed the bill', value: 'vetoed:line'
      value 'NONE', 'The action has no resolution', value: 'n/a'
    })

    field :date, !DateTimeType
  end
end
