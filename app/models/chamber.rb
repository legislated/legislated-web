class Chamber < ApplicationRecord
  has_many :committees

  # accessors
  def url
    "http://my.ilga.gov/Hearing/AllHearings?chamber=#{key}"
  end
end
