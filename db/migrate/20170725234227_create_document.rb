class CreateDocument < ActiveRecord::Migration[5.0]
  def change
    create_table :documents, id: :uuid do |t|
      t.column :os_id, :string
      t.column :number, :string, null: false
      t.column :full_text_url, :string
      t.column :slip_url, :string
      t.column :slip_results_url, :string
      t.column :is_amendment, :boolean, default: false
      t.column :bill_id, :uuid, null: false
      t.timestamps
    end

    add_index :documents, :bill_id

    reversible do |direction|
      direction.up { create_documents }
    end
  end

  def create_documents
    Bill.all.each do |bill|
      Document.create!(
        os_id: nil,
        number: bill.document_number,
        full_text_url: bill.full_text_url,
        slip_url: bill.witness_slip_url,
        slip_results_url: bill.witness_slip_result_url,
        is_amendment: false,
        bill_id: bill.id
      )
    end
  end
end
