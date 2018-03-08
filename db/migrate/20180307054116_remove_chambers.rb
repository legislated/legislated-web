class RemoveChambers < ActiveRecord::Migration[5.2]
  SET_COMMITTEE_CHAMBER = %[
    UPDATE committees as co
    SET chamber = ch.kind
    FROM chambers as ch
    WHERE ch.id = co.chamber_id
  ]

  def change
    add_column :committees, :chamber, :integer
    ActiveRecord::Base.connection.execute(SET_COMMITTEE_CHAMBER)
    change_column_null :committees, :chamber, false
    remove_column :committees, :chamber_id
    drop_table :chambers
  end
end
