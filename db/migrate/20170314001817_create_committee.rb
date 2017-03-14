class CreateCommittee < ActiveRecord::Migration[5.0]
  def change
    create_table :committees, id: :uuid do |t|
      t.column :external_id, :integer, null: false
      t.column :name, :string, null: false
      t.column :chamber_id, :uuid, null: false
      t.timestamps
    end

    add_index :committees, :chamber_id
    add_index :committees, :external_id, unique: true
  end
end
