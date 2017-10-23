module Types
  StepType = GraphQL::ObjectType.define do
    name 'Step'
    description 'A procedural step for a bill'

    # fields
    field :actor, !StepActorType, hash_key: 'actor'
    field :action, !StepActionType, hash_key: 'action'
    field :resolution, !StepResolutionType, hash_key: 'resolution'
    field :date, !DateTimeType, hash_key: 'date'
  end

  StepActorType = GraphQL::EnumType.define do
    name 'StepActor'
    description 'The governing body that took this step'

    value 'LOWER', 'The lower chamber (House)', value: Step::Actors::LOWER
    value 'LOWER_COMMITTEE', 'A committee in the lower chamber', value: Step::Actors::LOWER_COMMITTEE
    value 'UPPER', 'The upper chamber (Senate)', value: Step::Actors::UPPER
    value 'UPPER_COMMITTEE', 'A committee in the upper chamber', value: Step::Actors::UPPER_COMMITTEE
    value 'GOVERNOR', 'The governor', value: Step::Actors::GOVERNOR
  end

  StepActionType = GraphQL::EnumType.define do
    name 'StepAction'
    description 'The actions an actor can take'

    value 'INTRODUCED', 'The actor introduced the bill', value: Step::Actions::INTRODUCED
    value 'RESOLVED', 'The actor resolved the bill', value: Step::Actions::RESOLVED
  end

  StepResolutionType = GraphQL::EnumType.define do
    name 'StepResolution'
    description 'The resolutions for an action can have'

    value 'PASSED', 'The bill passed a vote', value: Step::Resolutions::PASSED
    value 'FAILED', 'The bill failed a vote', value: Step::Resolutions::FAILED
    value 'SIGNED', 'The governor signed the bill', value: Step::Resolutions::SIGNED
    value 'VETOED', 'The governor vetoed the bill', value: Step::Resolutions::VETOED
    value 'VETOED_LINE', 'The governor line-item vetoed the bill', value: Step::Resolutions::VETOED_LINE
    value 'NONE', 'The action has no resolution', value: Step::Resolutions::NONE
  end
end
