describe ImportAll do
  subject { described_class.new }

  describe '#perform' do
    before do
      allow(ImportBills).to receive(:perform_async)
      allow(ImportIlgaHearings).to receive(:perform_async)
    end

    it 'enqueues the bills import' do
      subject.perform
      expect(ImportBills).to have_received(:perform_async)
    end

    it 'enqueues a hearings import for each chamber' do
      subject.perform
      expect(ImportIlgaHearings).to have_received(:perform_async).with(Chamber::LOWER)
      expect(ImportIlgaHearings).to have_received(:perform_async).with(Chamber::UPPER)
    end
  end
end
