class BillsCsvService
  def serialize(bills = build_bills_query)
    CSV.generate do |csv|
      csv << columns
      bills.each do |bill|
        csv << row_from_bill(bill)
      end
    end
  end

  def build_bills_query(start_date = default_start_date)
    query = Bill.includes(hearing: :committee)
      .references(:hearings)
      .where("hearings.date >= ?", start_date)
      .order("hearings.date ASC")

    query
  end

  def default_start_date
    Time.now.beginning_of_week(:sunday)
  end

  private

  def columns
    [
      :document_number,
      :title,
      :summary,
      :details_url,
      :witness_slip_url,
      :hearing_date,
      :committee_name,
      :is_hidden,
      :proponent_position,
      :opponent_position,
    ]
  end

  def row_from_bill(bill)
    [
      bill.document_number,
      bill.title,
      bill.summary,
      bill.details_url,
      bill.witness_slip_url,
      bill.hearing.date,
      bill.hearing.committee.name,
      false,
      nil,
      nil
    ]
  end
end
