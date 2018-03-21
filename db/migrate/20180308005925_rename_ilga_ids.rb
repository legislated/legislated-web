class RenameIlgaIds < ActiveRecord::Migration[5.2]
  def change
    rename_column :bills, :external_id, :ilga_id
    rename_column :hearings, :external_id, :ilga_id
    rename_column :committees, :external_id, :ilga_id
  end
end
