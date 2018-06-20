module OpenStates
  class ParseSteps
    Step = Struct.new(
      :actor,
      :action,
      :resolution,
      :date
    )

    def call(actions)
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

    # action expansion
    def nonessential_action?(action)
      action[:action].match(/.* Amendment .*|(Assignments|Rules)( Committee)?$/)
    end

    def expand_action(action)
      attrs = action.slice(
        :actor,
        :date
      )

      action[:type].map do |type|
        attrs.merge(type: type)
      end
    end

    # step parsing
    def parse_step(action, actor)
      action_name = parse_action_name(action[:type])
      action_name.nil? ? nil : Step.new(
        actor,
        action_name,
        parse_resolution(action[:type]),
        parse_date(action[:date])
      )
    end

    # step field parsing
    def parse_actors(actions)
      actions.each_with_object([]) do |action, actors|
        actors << parse_actor!(action, actors)
      end
    end

    def parse_actor!(action, actors)
      ::Step::Actors.coerce!(parse_actor(action, actors))
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

    def parse_action_name(action_type)
      ACTION_TYPE_TO_NAME[action_type]
    end

    def parse_resolution(action_type)
      ACTION_TYPE_TO_RESOLUTION[action_type] || ::Step::Resolutions::NONE
    end

    def parse_date(date)
      date.to_time.iso8601
    end

    # constants
    def self.create_action_type_map(reversed_map)
      result = reversed_map.each_with_object({}) do |(value, keys), map|
        keys.each do |key|
          map[key] = value
        end
      end

      result.freeze
    end

    ACTION_TYPE_TO_RESOLUTION = create_action_type_map({
      ::Step::Resolutions::PASSED => [
        'committee:passed',
        'committee:passed:favorable',
        'committee:passed:unfavorable',
        'bill:passed',
        'bill:veto_override:passed'
      ],
      ::Step::Resolutions::FAILED => [
        'committee:failed',
        'bill:failed',
        'bill:veto_override:failed'
      ],
      ::Step::Resolutions::SIGNED => [
        'governor:signed'
      ],
      ::Step::Resolutions::VETOED => [
        'governor:vetoed'
      ],
      ::Step::Resolutions::VETOED_LINE => [
        'governor:vetoed:line-item'
      ]
    })

    ACTION_TYPE_TO_NAME = create_action_type_map({
      ::Step::Actions::INTRODUCED => [
        'bill:filed',
        'bill:introduced',
        'committee:referred',
        'governor:received'
      ],
      ::Step::Actions::RESOLVED => [
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
    })
  end
end
