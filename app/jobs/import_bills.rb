class ImportBills
  include Worker

  def initialize(
    redis = Redis.new,
    fetch_bills = OpenStates::FetchBills.new
  )
    @redis = redis
    @fetch_bills = fetch_bills
  end

  def perform
    bills = fetch_bills.call(
      updated_since: redis.get(:import_bills_job_date)&.to_time
    )

    bills.each do |data|
      bill_id = upsert_bill!(data)
      ImportIlgaBill.schedule(bill_id)
    end

    redis.set(:import_bills_job_date, Time.zone.now)
  end

  private

  attr_reader :redis, :fetch_bills

  def upsert_bill!(data)
    bill = Bill.upsert_by!(:ilga_id, data.bill)

    data.documents.each do |doc_data|
      Document.upsert_by!(:number, doc_data.to_h.merge({
        bill: bill
      }))
    end

    bill.id
  end
end
