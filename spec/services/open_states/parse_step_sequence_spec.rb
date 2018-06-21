describe OpenStates::ParseStepSequence do
  subject { described_class.new }

  describe '#call' do
    xit 'parses steps into a valid sequence' do
      steps = [
        build(:open_states_step, {
          actor: Step::Actors::LOWER,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::NONE,
          date: Time.now
        })
      ]

      actual = subject.call(steps)
      expect(actual.map(&:to_h)).to eq([])
    end
  end
end
