class Hearing < ApplicationRecord
  belongs_to :committee
  has_many :bills, dependent: :nullify
end
