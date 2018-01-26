class BillsStepParser
  def parse(actions)
    # prepare and expand actions based so that each has a single type
    actions = actions
      .map(&:with_indifferent_access)
      .reject { |action| nonessential_action?(action) }
      .flat_map { |action| expand_action(action) }

    # wind together actions with actors and build steps
    actions
      .zip(parse_actors(actions))
      .map { |action, actor| parse_step(action, actor) }
      .compact
  end

  private

  # preparation
  def nonessential_action?(action)
    action[:action].match(/(Assignments|Rules)$/)
  end

  def expand_action(action)
    attrs = action.slice(:actor, :date)
    action[:type].map do |type|
      attrs.merge(type: type)
    end
  end

  # step
  def parse_step(action, actor)
    action_name = parse_action(action[:type])
    return nil if action_name.nil?

    step = {
      actor: actor,
      action: action_name,
      resolution: parse_resolution(action[:type]),
      date: parse_date(action[:date])
    }

    step
  end

  # fields
  def parse_actors(actions)
    actions.reduce([]) do |actors, action|
      actor = parse_actor(action, actors)
      actors + [Step::Actors.coerce!(actor)]
    end
  end

  def parse_actor(action, actors)
    actor, action_type = action.values_at(:actor, :type)

    # use 'governor' instead of chamber
    if action_type.start_with?('governor')
      'governor'
    # prepend the first committee action with the chamber
    elsif action_type == 'committee:referred'
      "#{actor}:committee"
    # use the previous [chamber]:committee actor subsequently
    elsif actor == 'committee'
      actors.last
    # use the chamber otherwise
    else
      actor
    end
  end

  def parse_action(action_type)
    find_mapping(action_type, STEP_ACTIONS)
  end

  def parse_resolution(action_type)
    find_mapping(action_type, STEP_RESOLUTIONS) || Step::Resolutions::NONE
  end

  def parse_date(date)
    date.to_time.iso8601
  end

  # mappings
  def find_mapping(action_type, mappings)
    mappings
      .find { |_, action_types| action_types.include?(action_type) }&.first
  end

  STEP_RESOLUTIONS = {
    Step::Resolutions::PASSED => [
      'committee:passed',
      'committee:passed:favorable',
      'committee:passed:unfavorable',
      'bill:passed',
      'bill:veto_override:passed'
    ],
    Step::Resolutions::FAILED => [
      'committee:failed',
      'bill:failed',
      'bill:veto_override:failed'
    ],
    Step::Resolutions::SIGNED => [
      'governor:signed'
    ],
    Step::Resolutions::VETOED => [
      'governor:vetoed'
    ],
    Step::Resolutions::VETOED_LINE => [
      'governor:vetoed:line-item'
    ]
  }.freeze

  STEP_ACTIONS = {
    Step::Actions::INTRODUCED => [
      'bill:filed',
      'bill:introduced',
      'committee:referred',
      'governor:received'
    ],
    Step::Actions::RESOLVED => [
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
  }.freeze
end
