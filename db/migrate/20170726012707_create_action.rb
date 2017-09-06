class CreateAction < ActiveRecord::Migration[5.0]
  def change
    create_table :actions, id: :uuid do |t|
      t.column :bill_id, :uuid, null: false
      t.column :stage, :string, null: false
      t.column :type, :string, null: false
      t.column :datetime, :datetime, null: false
      t.timestamps
    end

    add_index :actions, :bill_id
    add_index :actions, :stage
  end
end
