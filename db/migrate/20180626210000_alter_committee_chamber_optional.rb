class AlterCommitteeChamberOptional < ActiveRecord::Migration[5.0]
    def change
      change_column_null :committees, :chamber, true
    end
end