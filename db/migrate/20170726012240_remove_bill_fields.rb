class RemoveBillFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :bills, :document_number, :string, null: false
    remove_column :bills, :full_text_url, :string
    remove_column :bills, :witness_slip_url, :string
    remove_column :bills, :witness_slip_result_url, :string
  end
end
