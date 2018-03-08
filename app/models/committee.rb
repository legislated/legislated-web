class Committee < ApplicationRecord
  include WithChamber

  has_many :hearings, dependent: :destroy
end
