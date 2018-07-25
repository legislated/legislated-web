class AddActorIndexToBills < ActiveRecord::Migration[5.0]
  def change
    add_index(:bills, "(steps->-1->>'actor')",
      name: 'index_bills_on_last_actor'
    )
  end
end
