class AddCommitteeFields < ActiveRecord::Migration[5.0]
  def change
    add_column :committees, :os_id, :string
  end
end
