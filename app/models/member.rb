class Member < ApplicationRecord
    belongs_to :legislators
    belongs_to :committees
end
