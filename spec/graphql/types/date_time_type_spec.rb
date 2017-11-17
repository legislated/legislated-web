describe Types::DateTimeType, graphql: :type do
  subject { described_class }

  let(:date) { Time.zone.now.round }
  let(:string) { date.iso8601 }

  it 'coerces string input into a time' do
    expect(subject.coerce_isolated_input(string)).to eq(date)
  end

  it 'coerces time output into a string' do
    expect(subject.coerce_isolated_result(date)).to eq(string)
  end
end
