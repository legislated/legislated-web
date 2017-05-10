class AddHumanSummaryToBills < ActiveRecord::Migration[5.0]
  def change
    add_column :bills, :human_summary, :string
  end
end
