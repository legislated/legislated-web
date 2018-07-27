class Legislator < ApplicationRecord
  has_many :committees, through: :members
end
