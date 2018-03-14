module Step
  module Actors
    include Enum

    values %w[
      lower
      lower:committee
      upper
      upper:committee
      governor
    ]
  end

  module Actions
    include Enum

    values %w[
      introduced
      resolved
    ]
  end

  module Resolutions
    include Enum

    values %w[
      passed
      failed
      signed
      vetoed
      vetoed:line
      none
    ]

    def self.resolved
      @resolved ||= all - [NONE]
    end
  end
end
