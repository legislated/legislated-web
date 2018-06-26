describe OpenStates::ParseStepSequence do
  subject { described_class.new }

  describe '#call' do
    it 'parses steps into a valid sequence' do
      steps = [
        build(:open_states_step, {
          actor: Step::Actors::LOWER,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::NONE,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::LOWER_COMMITTEE,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::NONE,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::LOWER_COMMITTEE,
          action: Step::Actions::RESOLVED,
          resolution: Step::Resolutions::PASSED,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::LOWER,
          action: Step::Actions::RESOLVED,
          resolution: Step::Resolutions::PASSED,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::UPPER,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::NONE,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::UPPER_COMMITTEE,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::NONE,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::UPPER_COMMITTEE,
          action: Step::Actions::RESOLVED,
          resolution: Step::Resolutions::PASSED,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::UPPER,
          action: Step::Actions::RESOLVED,
          resolution: Step::Resolutions::PASSED,
          date: Time.now
        }),
        build(:open_states_step, {
          actor: Step::Actors::LOWER,
          action: Step::Actions::INTRODUCED,
          resolution: Step::Resolutions::PASSED,
          date: Time.now
        })
      ]

      actual = subject.call(steps)
      binding.pry
      expect(actual.map(&:to_h)).to eq(steps.drop(4).map(&:to_h))
    end
  end
end
