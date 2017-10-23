class RenameStagesToSteps < ActiveRecord::Migration[5.0]
  def change
    rename_column :bills, :stages, :steps
    rename_column :bills, :raw_actions, :actions
  end
end
