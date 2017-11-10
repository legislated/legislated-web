class CreateOffices < ActiveRecord::Migration[5.0]
  def change
    create_table :offices, id: :uuid do |t|
    	t.uuid :legislator_id, null: false
    	t.string :location, null: false
    	t.string :building
    	t.string :address, null: false
    	t.string :phone
    	t.string :fax
    	t.string :email

    	t.timestamps(null: false)
    end
  end
end
