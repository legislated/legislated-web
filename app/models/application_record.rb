class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.upsert_by!(key, attrs)
    # binding.pry
    record = find_or_initialize_by(attrs.slice(key))
    record.assign_attributes(attrs)
    # p attrs[:os_id]
    # p record.os_id.class
    record.save!
    record
  end
end
