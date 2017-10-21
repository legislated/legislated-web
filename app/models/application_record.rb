class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.upsert_by!(key, attrs)
    record = find_or_initialize_by(attrs.slice(key))
    record.assign_attributes(attrs)
    record.save!
    record
  end
end
