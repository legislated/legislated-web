class Committee < ApplicationRecord
  belongs_to :chamber
  has_many :hearings, dependent: :destroy
end
