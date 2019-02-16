class RelaxOsIdRequirements < ActiveRecord::Migration[5.2]
  def change
    remove_index :bills, column: :os_id, unique: true
    remove_index :legislators, column: :os_id, unique: true
    change_column_null :legislators, :os_id, true, "1"
  end
end
