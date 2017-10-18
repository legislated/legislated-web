class StepsParser
  STEP_RESOLUTIONS = {
    'passed' => [
      'committee:passed',
      'committee:passed:favorable',
      'committee:passed:unfavorable',
      'bill:passed',
      'bill:veto_override:passed'
    ],
    'failed' => [
      'committee:failed',
      'bill:failed',
      'bill:veto_override:failed',
    ],
    'signed' => [
      'governor:signed'
    ],
    'vetoed' => [
      'governor:vetoed'
    ],
    'line-vetoed' => [
      'governor:vetoed:line-item'
    ]
  }

  STEP_ACTIONS = {
    'introduced' => [
      'bill:filed',
      'bill:introduced',
      'committee:referred',
      'governor:received'
    ],
    'resolved' => [
      'committee:failed',
      'committee:passed',
      'committee:passed:favorable',
      'committee:passed:unfavorable',
      'bill:failed',
      'bill:passed',
      'bill:veto_override:failed',
      'bill:veto_override:passed',
      'governor:vetoed',
      'governor:vetoed:line-item',
      'governor:signed'
    ]
  }

  def parse_actions(actions)
    actions = flatten_actions(actions)
    actors = parse_actors(actions)

    actions
      .map.with_index { |action, index|
        action_name = parse_action(action[:type])

        if action_name.nil?
          nil
        else
          {
            actor: actors[index],
            action: action_name,
            resolution: parse_resolution(action[:type]),
            date: action[:date]
          }
        end
      }
      .compact
  end

  # preparation
  def flatten_actions(actions)
    actions
      .map(&:with_indifferent_access)
      .reject { |a| a[:action].match(/(Assignments|Rules)$/) }
      .flat_map { |a|
        a[:type].map { |type| a.slice(:actor, :date).merge(type: type) }
      }
  end

  # fields
  def parse_actors(actions)
    actions.reduce([]) do |actors, action|
      actor, type = action[:actor], action[:type]

      # use an explicit governor instead of chamber
      if type.start_with?('governor')
        actors + ['governor']
      # prepend the chamber for the first committee actor
      elsif type == 'committee:referred'
        actors + ["#{actor}:committee"]
      # use the last committe actor (already prepended with chamber)
      elsif actor == 'committee'
        actors + [actors.last]
      else
        actors + [actor]
      end
    end
  end

  def parse_action(type)
    STEP_ACTIONS
      .find { |_, action_types| action_types.include?(type) }
      .try(:first)
  end

  def parse_resolution(type)
    resolution = STEP_RESOLUTIONS
      .find { |_, action_types| action_types.include?(type) }
      .try(:first)

    resolution || 'n/a'
  end
end
