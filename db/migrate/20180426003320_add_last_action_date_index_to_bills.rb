class AddLastActionDateIndexToBills < ActiveRecord::Migration[5.2]
  def change
    add_index(:bills, "(actions->-1->>'date') DESC NULLS LAST",
      name: 'index_bills_on_last_action_date',
    )
  end
end
