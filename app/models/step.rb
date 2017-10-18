module Step
  module Actors
    extend Enumeration
    values %w[
      lower
      lower:committee
      upper
      upper:committee
      governor
    ]
  end

  module Actions
    extend Enumeration
    values %w[
      introduced
      resolved
    ]
  end

  module Resolutions
    extend Enumeration
    values %w[
      passed
      failed
      signed
      vetoed
      vetoed:line
      none
    ]
  end
end
