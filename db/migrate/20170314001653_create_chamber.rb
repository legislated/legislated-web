class CreateChamber < ActiveRecord::Migration[5.0]
  def change
    create_table :chambers, id: :uuid do |t|
      t.column :name, :string, null: false
      t.column :key, :string, null: false
      t.timestamps
    end
  end
end
