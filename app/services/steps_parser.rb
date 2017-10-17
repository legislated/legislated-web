class StepsParser
  module ActionTypes
    INTRODUCED = %w[
      bill:filed
      bill:introduced
      committee:referred
      governor:received
    ].freeze

    PASSED = %w[
      committee:passed
      committee:passed:favorable
      committee:passed:unfavorable
      bill:passed
      governor:signed
      bill:veto_override:passed
    ].freeze

    FAILED = %w[
      committee:failed
      bill:failed
      governor:vetoed
      governor:vetoed:line-item
      bill:veto_override:failed
    ].freeze

    COMPLETED = [*PASSED, *FAILED].freeze
  end

  module StageTypes
    COMMITTEE = %w[
      committee:referred
      committee:passed
      committee:passed:favorable
      committee:passed:unfavorable
      committee:failed
    ].freeze

    GOVERNOR = %w[
      governor:received
      governor:signed
      governor:vetoed
      governor:vetoed:line-item
    ].freeze

    VETO = %w[
      bill:veto_override:passed
      bill:veto_override:failed
    ].freeze
  end

  def parse_actions(actions)
    # create a stage for each introduced action
    stages = actions
      .select { |action| introduced_action?(action) }
      .map do |introduced_action|
        {
          introduced_date: introduced_action['date'],
          name: get_stage_name(introduced_action)
        }
      end

    # for each completed action, updated the existing stage for the corresponding
    # introduced action or create a new one
    actions
      .select { |action| has_completed_action_type?(action['type']) }
      .each do |completed_action|
        # find the existing stage for the corresponding introduced action
        stage = get_stage_for_completed_action(completed_action, stages)

        # create a new stage if there is not one for a corresponding introduced action
        if stage.nil?
          stage = { name: get_stage_name(completed_action) }
          stages << stage
        end

        stage[:completed_date] = completed_action['date']
        stage[:failed] = !has_passed_action_type?(completed_action['type'])
      end

    # return the stages
    stages
  end

  def self.get_stage_name(action)
    types = action['type']

    return action['actor'] + ':committee' if has_committee_stage_type?(types)
    return 'governor' if has_governor_stage_type?(types)
    # return 'veto' if has_veto_stage_type?(types)
    action['actor']
  end

  # find the last corresponding introduced action by stage name for a completed action
  def self.get_stage_for_completed_action(completed_action, stages)
    stage_name = get_stage_name(completed_action)

    eligible_stages = stages.select do |next_stage|
      next_stage[:name] == stage_name && next_stage[:introduced_date] <= completed_action['date']
    end

    eligible_stages.last
  end

  def self.introduced_action?(action)
    has_introduced_action_type?(action['type']) && substantive_action?(action['action'])
  end

  def self.substantive_action?(action)
    !action.match(/(Assignments|Rules)$/)
  end

  # rubocop:disable Naming/PredicateName
  def self.has_introduced_action_type?(types)
    has_type?(types, ActionTypes::INTRODUCED)
  end

  def self.has_completed_action_type?(types)
    has_type?(types, ActionTypes::COMPLETED)
  end

  def self.has_passed_action_type?(types)
    has_type?(types, ActionTypes::PASSED)
  end

  def self.has_committee_stage_type?(types)
    has_type?(types, StageTypes::COMMITTEE)
  end

  def self.has_governor_stage_type?(types)
    has_type?(types, StageTypes::GOVERNOR)
  end

  def self.has_veto_stage_type?(types)
    has_type?(types, StageTypes::VETO)
  end

  def self.has_type?(action_types, type_defs)
    !(action_types & type_defs).empty?
  end
end
