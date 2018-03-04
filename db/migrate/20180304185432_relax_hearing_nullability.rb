class RelaxHearingNullability < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:hearings, :url,          true)
    change_column_null(:hearings, :location,     true)
    change_column_null(:hearings, :is_cancelled, true)
    change_column_default(:hearings, :is_cancelled, false)
  end
end
