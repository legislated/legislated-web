class AddSearchColumnToBills < ActiveRecord::Migration[5.2]
  # useful resources for implementing a properly-indexed full-text search:
  # - https://robots.thoughtbot.com/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers
  # - https://github.com/Casecommons/pg_search#using-tsvector-columns
  def up
    add_column :bills, :search_vector, :tsvector
    add_index :bills, :search_vector, using: 'gin'

    execute <<-SQL
      CREATE INDEX title_on_bills_trgm_idx
      ON bills
      USING GIN(title gin_trgm_ops);
    SQL

    execute <<-SQL
      CREATE TRIGGER update_search_vector BEFORE INSERT OR UPDATE
      ON bills FOR EACH ROW EXECUTE PROCEDURE
      tsvector_update_trigger(search_vector, 'pg_catalog.english', title, summary);
    SQL

    update "UPDATE bills SET updated_at = '#{Time.current.to_s(:db)}'"
  end

  def down
    execute <<-SQL
      DROP TRIGGER update_search_vector
      ON bills
    SQL

    execute <<-SQL
      DROP INDEX title_on_bills_trgm_idx
    SQL

    remove_index :bills, :search_vector
    remove_column :bills, :search_vector
  end
end
