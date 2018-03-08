describe ImportIlgaHearings do
  let(:id) { 10 }

  before do
    allow(ImportIlgaHearingBills).to receive(:schedule)
  end

  describe '#perform' do
    it 'imports hearings and committes' do
      subject = described_class.new(
        -> (_) { [fetched_hearing(id)] },
        -> (_) { [scraped_hearing(id)] }
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
        -> (_) { [fetched_hearing(id)] },
        -> (_) { [] }
      )

      subject.perform(Chamber::LOWER)
      actual = Hearing.find_by(ilga_id: id)
      expect(actual).to have_attributes(url: nil)
    end
  end

  # helpers
  P = Ilga::ParseHearing
  S = Ilga::ScrapeHearings

  def fetched_hearing(ilga_id)
    P::Hearing.new(
      ilga_id, Time.current, 'location', 0,
      P::Committee.new(
        100, 'committee_name'
      )
    )
  end

  def scraped_hearing(ilga_id)
    S::Hearing.new(
      ilga_id, 'http://www.hearing-url.com'
    )
  end
end
