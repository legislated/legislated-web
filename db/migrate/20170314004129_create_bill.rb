class CreateBill < ActiveRecord::Migration[5.0]
  def change
    create_table :bills, id: :uuid do |t|
      t.column :external_id, :integer, null: false
      t.column :url, :string, null: false
      t.column :document_name, :string, null: false
      t.column :description, :datetime, null: false
      t.column :synopsis, :boolean, null: false
      t.column :sponsor_name, :boolean, null: false
      t.column :witness_slip_url, :string, null: false
      t.column :hearing_id, :uuid, null: false
      t.timestamps
    end

    add_index :bills, :hearing_id
    add_index :bills, :external_id, unique: true
  end
end
