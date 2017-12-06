class CreateMember < ActiveRecord::Migration[5.0]
  def change
    create_table :members, id: :uuid do |t|
      t.column :os_leg_id, :string
      t.column :os_committee_id, :string
      t.column :role, :string
      t.column :session_number, :string
      t.timestamps
    end
  end
end
