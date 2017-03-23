class Chamber < ApplicationRecord
  enum kind: [ :house, :senate ]

  # relationships
  has_many :committees

  # accessors
  def url
    case kind.to_sym
    when :senate
      "http://my.ilga.gov/Hearing/AllHearings?chamber=S"
    when :house
      "http://my.ilga.gov/Hearing/AllHearings?chamber=H"
    else
      raise "Unknown chamber kind: #{kind}"
    end
  end
end
