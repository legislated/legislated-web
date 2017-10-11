class ChangeTypeOfLegislatorOsId < ActiveRecord::Migration[5.0]
  def change
    change_column :legislators, :os_id, :string
    remove_column :legislators, :external_id
  end
end
