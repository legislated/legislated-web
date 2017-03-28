class NormalizeFieldNames < ActiveRecord::Migration[5.0]
  def change
    remove_column :hearings, :allows_slips, :boolean
    rename_column :hearings, :datetime, :date

    rename_column :bills, :document_name, :document_number
    rename_column :bills, :description, :title
    rename_column :bills, :synopsis, :summary

    reversible do |change|
      map = {
        "H" => "0",
        "S" => "1"
      }

      change.up do
        Chamber.all.each { |c| c.update!(key: map[c.key]) }
        change_column :chambers, :key, 'integer USING CAST(key AS integer)'
        rename_column :chambers, :key, :kind
      end

      change.down do
        change_column :chambers, :kind, :string
        rename_column :chambers, :kind, :key
        inverse_map = map.invert
        Chamber.all.each { |c| c.update!(key: inverse_map[c.key]) }
      end
    end
  end
end
