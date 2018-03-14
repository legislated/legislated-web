describe ImportIlgaHearings do
  let(:id) { 10 }

  before do
    allow(ImportIlgaHearingBills).to receive(:schedule)
  end

  describe '#perform' do
    it 'imports hearings and committes' do
      subject = described_class.new(
        -> (_) { build_list(:fetched_ilga_hearing, 1, ilga_id: id) },
        -> (_) { build_list(:scraped_ilga_hearing, 1, ilga_id: id) },
      )

      expect do
        subject.perform(Chamber::LOWER)
      end.to pass_all(
        change(Hearing, :count).by(1),
        change(Committee, :count).by(1)
      )
    end

    it 'ignores missing scraped hearings' do
      subject = described_class.new(
        -> (_) { build_list(:fetched_ilga_hearing, 1, ilga_id: id) },
        -> (_) { [] }
      )

      subject.perform(Chamber::LOWER)
      actual = Hearing.find_by(ilga_id: id)
      expect(actual).to have_attributes(url: nil)
    end
  end
end
