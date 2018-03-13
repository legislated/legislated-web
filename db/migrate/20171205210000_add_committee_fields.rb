class AddCommitteeFields < ActiveRecord::Migration[5.0]
  def change
    add_column :committees, :os_id, :string
    add_column :committees, :subcommittee, :string
    add_column :committees, :sources, :string
  end
end
