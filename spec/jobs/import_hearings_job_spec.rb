describe ImportHearingsJob do
  subject { described_class.new }

  describe "#perform" do
    it "returns 'Hello, world" do
      expect(subject.perform).to eq("Hello, world")
    end
  end
end
