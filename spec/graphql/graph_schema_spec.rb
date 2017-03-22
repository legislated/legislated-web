describe GraphSchema do
  subject { described_class }

  shared_examples "a relay node provider" do |graph_type|
    let(:global_id) { GraphQL::Schema::UniqueWithinType.encode(graph_type.name, record.id) }

    it "finds the record by global id" do
      expect(subject.object_from_id(global_id, nil)).to eq(record)
    end

    it "finds the graph type of the record" do
      expect(subject.resolve_type(record, nil)).to eq(graph_type)
    end

    it "generates a global id from the record" do
      expect(subject.id_from_object(record, graph_type, nil)).to eq(global_id)
    end
  end

  it_behaves_like "a relay node provider", Types::ChamberType do
    let(:record) { create(:chamber) }
  end

  it_behaves_like "a relay node provider", Types::CommitteeType do
    let(:record) { create(:committee, :with_any_chamber) }
  end

  it_behaves_like "a relay node provider", Types::HearingType do
    let(:record) { create(:hearing, :with_any_committee) }
  end

  it_behaves_like "a relay node provider", Types::BillType do
    let(:record) { create(:bill, :with_any_hearing) }
  end
end
