class InitSchema < ActiveRecord::Migration[5.0]
  def up
    # These are extensions that must be enabled in order to support this database
    enable_extension "pg_trgm"
    enable_extension "plpgsql"
    enable_extension "uuid-ossp"
    create_table "bills", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.integer "external_id", null: false
      t.string "title"
      t.string "summary"
      t.string "sponsor_name"
      t.uuid "hearing_id"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "human_summary"
      t.string "os_id"
      t.integer "session_number"
      t.string "details_url"
      t.jsonb "actions", default: []
      t.jsonb "steps", default: []
      t.index ["external_id"], name: "index_bills_on_external_id", unique: true
      t.index ["hearing_id"], name: "index_bills_on_hearing_id"
      t.index ["os_id"], name: "index_bills_on_os_id", unique: true
    end
    create_table "chambers", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.string "name", null: false
      t.integer "kind", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
    create_table "committees", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.integer "external_id", null: false
      t.string "name", null: false
      t.uuid "chamber_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["chamber_id"], name: "index_committees_on_chamber_id"
      t.index ["external_id"], name: "index_committees_on_external_id", unique: true
    end
    create_table "documents", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.string "os_id"
      t.string "number", null: false
      t.string "full_text_url"
      t.string "slip_url"
      t.string "slip_results_url"
      t.boolean "is_amendment", default: false
      t.uuid "bill_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["bill_id"], name: "index_documents_on_bill_id"
    end
    create_table "hearings", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.integer "external_id", null: false
      t.string "url", null: false
      t.string "location", null: false
      t.datetime "date", null: false
      t.boolean "is_cancelled", null: false
      t.uuid "committee_id", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["committee_id"], name: "index_hearings_on_committee_id"
      t.index ["external_id"], name: "index_hearings_on_external_id", unique: true
    end
    create_table "legislators", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
      t.string "os_id", null: false
      t.string "first_name", null: false
      t.string "last_name", null: false
      t.string "email"
      t.string "twitter"
      t.string "district", null: false
      t.string "chamber", null: false
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "active", default: false
      t.string "middle_name", null: false
      t.string "suffixes", null: false
      t.string "party", null: false
      t.string "website_url"
      t.index ["os_id"], name: "index_legislators_on_os_id", unique: true
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "The initial migration is not revertable"
  end
end
