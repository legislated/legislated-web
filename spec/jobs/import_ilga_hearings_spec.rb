describe ImportIlgaHearings do
  describe '#perform' do
    it 'upserts hearings and committes' do
      external_id = 10
      subject = described_class.new(
        -> (_) { [fetched_hearing(external_id)] },
        -> (_) { [scraped_hearing(external_id)] }
      )

      expect do
        subject.perform(Chamber.first.id)
      end.to pass_all(
        change(Hearing, :count).by(1),
        change(Committee, :count).by(1)
      )
    end

    it 'ignores missing scraped hearings' do
      external_id = 10
      subject = described_class.new(
        -> (_) { [fetched_hearing(external_id)] },
        -> (_) { [] }
      )

      subject.perform(Chamber.first.id)
      actual = Hearing.find_by(external_id: external_id)
      expect(actual).to have_attributes(url: nil)
    end
  end

  # helpers
  P = Ilga::ParseHearing
  S = Ilga::ScrapeHearings

  def fetched_hearing(external_id)
    P::Hearing.new(
      external_id, Time.current, 'location', 0,
      P::Committee.new(
        100, 'committee_name'
      )
    )
  end

  def scraped_hearing(external_id)
    S::Hearing.new(
      external_id, 'http://www.hearing-url.com'
    )
  end
end
