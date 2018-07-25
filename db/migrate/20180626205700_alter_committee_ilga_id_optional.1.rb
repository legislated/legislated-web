class AlterCommitteeIlgaIdOptional < ActiveRecord::Migration[5.0]
    def change
      change_column_null :committees, :ilga_id, true
    end
end