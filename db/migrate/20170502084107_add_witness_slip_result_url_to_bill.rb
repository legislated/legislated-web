class AddWitnessSlipResultUrlToBill < ActiveRecord::Migration[5.0]
  def change
    add_column :bills, :witness_slip_result_url, :string
  end
end
