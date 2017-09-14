class BillsCsvService
  def serialize(bills)
    CSV.generate do |csv|
      csv << columns
      bills.each do |bill|
        csv << row_from_bill(bill)
      end
    end
  end

  private

  def columns
    %i[
      document_number
      title
      summary
      details_url
      witness_slip_url
      hearing_date
      committee_name
      priority
      human_summary
      proponent_position
      opponent_position
    ]
  end

  def row_from_bill(bill)
    [
      bill.document&.number,
      bill.title,
      bill.summary,
      bill.details_url,
      bill.document&.slip_url,
      bill.hearing.date,
      bill.hearing.committee.name,
      1,
      nil,
      nil,
      nil
    ]
  end
end
