class NormalizeFieldNames < ActiveRecord::Migration[5.0]
  def change
    remove_column :hearings, :allows_slips, :boolean
    rename_column :hearings, :datetime, :date

    rename_column :bills, :document_name, :document_number
    rename_column :bills, :description, :title
    rename_column :bills, :synopsis, :summary

    reversible do |change|
      map = {
        "H" => "0",
        "S" => "1"
      }

      change.up do
        Chamber.all.each { |c| c.update!(key: map[c.key]) }
        change_column :chambers, :key, 'integer USING CAST(key AS integer)'
        rename_column :chambers, :key, :kind
      end

      change.down do
        change_column :chambers, :kind, :string
        rename_column :chambers, :kind, :key
        inverse_map = map.invert
        Chamber.all.each { |c| c.update!(key: inverse_map[c.key]) }
      end
    end
  end
end

# {
#   "sources": [{
#     "url": "http://ilga.gov/legislation/BillStatus.asp?DocNum=3816&GAID=14&DocTypeID=HB&LegId=105794&SessionID=91&GA=100"
#   }],
#   "session": "100th",
#   "id": "ILB00099162",
#   "votes": [],
#   "documents": [{
#     "url": "http://ilga.gov/legislation/fulltext.asp?DocName=10000HB3816ham001&GA=100&SessionId=91&DocTypeId=HB&LegID=105794&DocNum=3816&GAID=14&Session=",
#     "doc_id": "ILD00172617",
#     "name": "House Amendment 001"
#   }],
#   "title": "CD CORR-ELDERLY PRIS RELEASE",
#   "alternate_titles": [],
#   "companions": [],
#   "all_ids": ["ILB00099162"],
#   "state": "il",
#   "subjects": [],
#   "type": ["bill"],
#   "sponsors": [{
#     "chamber": "lower",
#     "leg_id": "ILL000142",
#     "official_type": "chief",
#     "type": "primary",
#     "name": "Elaine Nekritz"
#   }, {
#     "chamber": "lower",
#     "leg_id": "ILL000075",
#     "official_type": "Chief Co-Sponsor",
#     "type": "cosponsor",
#     "name": "Kelly M. Cassidy"
#   }, {
#     "chamber": "lower",
#     "leg_id": "ILL000995",
#     "official_type": "Chief Co-Sponsor",
#     "type": "cosponsor",
#     "name": "Will Guzzardi"
#   }],
#   "updated_at": "2017-03-17 10:03:29",
#   "action_dates": {
#     "passed_upper": null,
#     "passed_lower": null,
#     "last": "2017-03-16 00:00:00",
#     "signed": null,
#     "first": "2017-02-10 00:00:00"
#   },
#   "created_at": "2017-02-11 09:38:01",
#   "versions": [{
#     "mimetype": "text/html",
#     "url": "http://ilga.gov/legislation/fulltext.asp?DocName=10000HB3816&GA=100&SessionId=91&DocTypeId=HB&LegID=105794&DocNum=3816&GAID=14&Session=&print=true",
#     "doc_id": "ILD00171243",
#     "name": "Introduced"
#   }],
#   "summary": "Amends the Unified Code of Corrections. Provides that a committed person who is at least 55 years of age and who has served at least 20 consecutive years of imprisonment in a Department of Corrections institution or facility may petition the Prisoner Review Board for participation in the Elderly Rehabilitated Prisoner Supervised Release Program. Provides that if the committed person files the petition, the victims and the families of the victims of the petitioner's offenses shall be notified in a timely manner after the petition is filed. Provides that within 30 days after receiving the petition, the Board shall notify the victims and the families of the victims of the committed person's petition, and it shall provide an opportunity for the victims and their families to submit statements in support of or opposition to the petitioner's participation in the Program. Provides that the Board shall consider the petition in its entirety, including information supplied by the Department of Corrections, and shall not order the release of the petitioner if it finds that the petitioner's release would pose an unacceptable risk of danger to public safety. Provides that if the Board determines that the petitioner should participate in the Program, the Board shall set a date for his or her release that is before the expiration of his or her current sentence. Provides that the Board also shall set conditions for the petitioner's release in accordance with the person's risks, assets, and needs which are identified through an assessment tool provided in the Illinois Crime Reduction Act of 2009.",
#   "chamber": "lower",
#   "bill_id": "HB 3816"
# }
