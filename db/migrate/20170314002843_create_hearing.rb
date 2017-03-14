class CreateHearing < ActiveRecord::Migration[5.0]
  def change
    create_table :hearings, id: :uuid do |t|
      t.column :external_id, :integer, null: false
      t.column :url, :string, null: false
      t.column :location, :string, null: false
      t.column :datetime, :datetime, null: false
      t.column :allows_slips, :boolean, null: false
      t.column :is_cancelled, :boolean, null: false
      t.column :committee_id, :uuid, null: false
      t.timestamps
    end

    add_index :hearings, :committee_id
    add_index :hearings, :external_id, unique: true
  end
end
