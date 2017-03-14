describe ImportHearingsJob do
  subject { described_class.new }

  describe "#perform" do
    before do
      Chamber.create(name: "Senate", key: "S")
    end

    it "adds any new records" do
      expect { subject.perform }.to change(Committee, :count)
      require "pry"; binding.pry
    end
  end
end
