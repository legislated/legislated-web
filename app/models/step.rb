module Step
  module Actors
    include Enumeration

    values %w[
      lower
      lower:committee
      upper
      upper:committee
      governor
    ]
  end

  module Actions
    include Enumeration

    values %w[
      introduced
      resolved
    ]
  end

  module Resolutions
    include Enumeration

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
