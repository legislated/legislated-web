class CreateLegislator < ActiveRecord::Migration[5.0]
  def change
    create_table :legislators, id: :uuid do |t|
      t.column :external_id, :integer, null: false
      t.column :first_name, :string, null: false
      t.column :last_name, :string, null: false
      t.column :email, :string
      t.column :phone_number, :string
      t.column :twitter_username, :string
      t.column :district, :string, null: false
      t.column :chamber, :string
      t.timestamps
    end

    add_index :legislators, :external_id, unique: true
  end
end
