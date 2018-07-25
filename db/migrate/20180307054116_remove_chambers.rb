class RemoveChambers < ActiveRecord::Migration[5.2]
  def change
    add_column :committees, :chamber, :integer

    execute <<-SQL
      UPDATE committees as co
      SET chamber = ch.kind
      FROM chambers as ch
      WHERE ch.id = co.chamber_id
    SQL

    change_column_null :committees, :chamber, false
    remove_column :committees, :chamber_id
    drop_table :chambers
  end
end
