class Hearing < ApplicationRecord
  belongs_to :committee
  has_many :bills
end
