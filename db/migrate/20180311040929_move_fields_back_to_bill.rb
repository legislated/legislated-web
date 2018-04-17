class MoveFieldsBackToBill < ActiveRecord::Migration[5.2]
  SET_BILL_DATA = %[
    UPDATE bills as b
    SET number = d.number, slip_url = d.slip_url, slip_results_url = d.slip_results_url
    FROM documents as d
    WHERE d.bill_id = b.id AND d.is_amendment = false
  ]

  def change
    add_column :bills, :number, :string
    add_column :bills, :slip_url, :string
    add_column :bills, :slip_results_url, :string

    ActiveRecord::Base.connection.execute(SET_BILL_DATA)

    change_column_null :bills, :number, false
    remove_column :documents, :slip_url, :string
    remove_column :documents, :slip_results_url, :string
  end
end
