class CreateBill < ActiveRecord::Migration[5.0]
  def change
    create_table :bills, id: :uuid do |t|
      t.column :external_id, :integer, null: false
      t.column :document_name, :string, null: false
      t.column :description, :string
      t.column :synopsis, :string
      t.column :sponsor_name, :string, null: false
      t.column :witness_slip_url, :string
      t.column :hearing_id, :uuid, null: false
      t.timestamps
    end

    add_index :bills, :hearing_id
    add_index :bills, :external_id, unique: true
  end
end
