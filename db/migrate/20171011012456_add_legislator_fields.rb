class AddLegislatorFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :legislators, :external_id, :integer, null: false
    remove_column :legislators, :phone_number, :string

    add_column :legislators, :active, :boolean, default: false
    add_column :legislators, :middle_name, :string, null: false
    add_column :legislators, :suffixes, :string, null: false
    add_column :legislators, :party, :string, null: false
    add_column :legislators, :website_url, :string

    rename_column :legislators, :twitter_username, :twitter

    reversible do |dir|
      dir.up do
        change_column :legislators, :os_id, :string, null: false
        change_column :legislators, :chamber, :string, null: false
      end

      dir.down do
        change_column :legislators, :os_id, 'integer USING CAST(os_id AS integer)', null: false
        change_column :legislators, :chamber, :string
      end
    end

    add_index :legislators, :os_id, unique: true
  end
end
