describe Bills::Search do
  subject { described_class.new }

  describe '#call' do
    it 'filters bills by witness slips' do
      bill1 = create(:bill, hearing_date: 2.days.from_now)
      bill2 = create(:bill, hearing_date: 1.days.from_now)
      create(:bill, hearing_date: 2.days.ago)
      expect(subject.call(subset: :slips)).to eq([bill2, bill1])
    end

    it 'filters bills by actor' do
      bill1 = create(:bill, last_actor: Step::Actors::LOWER, last_action_date: 3.days.ago)
      bill2 = create(:bill, last_actor: Step::Actors::LOWER_COMMITTEE, last_action_date: 2.days.ago)
      create(:bill, last_actor: Step::Actors::UPPER)
      expect(subject.call(subset: :lower)).to eq([bill2, bill1])
    end

    context 'with a search query' do
      it 'finds bills where the title prefix matches' do
        bill = create(:bill, title: 'GrEaT BiLl')
        create(:bill, title: 'ZzZZz sO BAd')
        expect(subject.call(query: 'GREA')).to eq([bill])
      end

      it 'finds bills where the title fuzzy matches' do
        bill = create(:bill, title: 'GrEaT BilL')
        create(:bill, title: 'ZzZZz sO BAd')
        expect(subject.call(query: 'REAT')).to eq([bill])
      end

      it 'finds bills where the summary prefix matches' do
        bill = create(:bill, summary: '...GrEaT BiLl')
        create(:bill, summary: '...ZzZZz sO BAd')
        expect(subject.call(query: 'BILL')).to eq([bill])
      end
    end

    context 'with a document number' do
      let!(:unmatched_bill) { create(:bill, number: 'fake') }

      prefix_map = {
        'house bills': 'HB',
        'house resolutions': 'HR',
        'house joint resolutions': 'HJR',
        'house amendments': 'HJRCA',
        'senate bills': 'SB',
        'senate resolutions': 'SR',
        'senate joint resolutions': 'SJR',
        'senate amendments': 'SJRCA',
        'executive orders': 'EO',
        'joint session resolutions': 'JSR',
        'appointment messages': 'AM'
      }

      prefix_map.each do |name, prefix|
        it "finds #{name} by doucment number" do
          bill = create(:bill, number: "#{prefix}1234")
          expect(subject.call(query: prefix)).to eq([bill])
        end
      end
    end
  end
end
