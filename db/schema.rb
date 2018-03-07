# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_03_07_054116) do

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
    t.index "(((steps -> '-1'::integer) ->> 'actor'::text))", name: "index_bills_on_last_actor"
    t.index ["external_id"], name: "index_bills_on_external_id", unique: true
    t.index ["hearing_id"], name: "index_bills_on_hearing_id"
    t.index ["os_id"], name: "index_bills_on_os_id", unique: true
  end

  create_table "committees", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.integer "external_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "chamber", null: false
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
    t.string "url"
    t.string "location", null: false
    t.datetime "date", null: false
    t.boolean "is_cancelled", default: false
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
