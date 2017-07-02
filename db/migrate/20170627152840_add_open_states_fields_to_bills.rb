class AddOpenStatesFieldsToBills < ActiveRecord::Migration[5.0]
  def change
    add_column :bills, :os_id, :string
    add_column :bills, :session_number, :integer
    add_column :bills, :details_url, :string
    add_column :bills, :full_text_url, :string

    add_index :bills, :os_id, unique: true

    change_column_null :bills, :hearing_id, true
    change_column_null :bills, :sponsor_name, true
  end
end
