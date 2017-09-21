class ActionsJsonb < ActiveRecord::Migration[5.0]
  def change
    add_column :bills, :raw_actions, :jsonb, default: "{}"
    add_column :bills, :stages, :jsonb, default: "{}"
  end
end
