class BillsActionsService
  module ActionTypes
    INTRODUCED = %w(
      bill:filed
      bill:introduced
      committee:referred
      governor:received
    )

    PASSED = %w(
      committee:passed
      committee:passed:favorable
      committee:passed:unfavorable
      bill:passed
      governor:signed
      bill:veto_override:passed
    )
    
    FAILED = %w(
      committee:failed
      bill:failed
      governor:vetoed
      governor:vetoed:line-item
      bill:veto_override:failed
    )

    COMPLETED = [*PASSED, *FAILED]
  end

  module StageTypes
    COMMITTEE = %w(
      committee:referred
      committee:passed
      committee:passed:favorable
      committee:passed:unfavorable
      committee:failed
    )

    GOVERNOR = %w(
      governor:received
      governor:signed
      governor:vetoed
      governor:vetoed:line-item
    )

    VETO = %w(
      bill:veto_override:passed
      bill:veto_override:failed
    )
  end

  def self.compute_stages(actions)
    introduced_actions = actions.select do |action|
      has_introduced_action_type?(action['type']) && is_substantive_action?(action['action'])
    end

    completed_actions = actions.select do |action|
      has_completed_action_type?(action['type'])
    end

    stages = introduced_actions.map do |action|
      {
        introduced_date: action['date'],
        name: get_stage_name(action)
      }
    end

    completed_actions.map do |action|
      stage = get_stage_for_completed_action(action, stages)
      if stage.nil?
        stage = {name: get_stage_name(action)}
        stages << stage
      end
      stage[:completed_date] = action['date']
      stage[:failed] = !has_passed_action_type?(action['type'])
    end

    stages
  end
   
  def self.get_stage_name(action)
    
    types = action['type']
    
    case
      when has_committee_stage_type?(types)
        action['actor'] + ':committee'
      when has_governor_stage_type?(types)
        'governor'
      # when has_veto_stage_type?(types)
      #   'veto'
      else
        action['actor']
    end
  end

  # find the last corresponding introduced action by name for a completed action
  def self.get_stage_for_completed_action(completed_action, stages)
    stage_name = get_stage_name(completed_action)

    eligible_stages = stages.select do |next_stage|
      next_stage[:name] == stage_name && next_stage[:introduced_date] <= completed_action['date']
    end

    eligible_stages.last

    # stage = stages.select do |next_stage|
    #   if next_stage['name'] == stage_name
    #     unless next_stage['introduced'] > completed_action['date']
    #       if stage.nil? || stage['introduced'] < next_stage['introduced']
    #         stage = next_stage
    #       end
    #     end
    #   end
    #   stage
    # end
  end

  def self.is_substantive_action?(action)
    !action.match(/(Assignments|Rules)$/)
  end

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
    action_types.any? { |type| type_defs.include? type }
  end
end
