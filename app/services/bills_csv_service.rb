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
    [
      :document_number,
      :title,
      :summary,
      :details_url,
      :witness_slip_url,
      :hearing_date,
      :committee_name
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
      bill.hearing.committee.name
    ]
  end
end
