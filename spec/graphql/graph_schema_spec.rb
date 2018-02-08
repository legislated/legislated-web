describe GraphSchema, :graph_type do
  subject { described_class }

  shared_examples 'a relay node provider' do |graph_type|
    let(:global_id) { GraphQL::Schema::UniqueWithinType.encode(graph_type.name, model.id) }

    it 'finds the model by global id' do
      expect(subject.object_from_id(global_id, nil)).to eq(model)
    end

    it 'finds the graph type of the model' do
      expect(subject.resolve_type(model, nil)).to eq(graph_type)
    end

    it 'generates a global id from the model' do
      expect(subject.id_from_object(model, graph_type, nil)).to eq(global_id)
    end
  end

  it_behaves_like 'a relay node provider', Types::ViewerType do
    let(:model) { Viewer.instance }
  end

  it_behaves_like 'a relay node provider', Types::ChamberType do
    let(:model) { create(:chamber) }
  end

  it_behaves_like 'a relay node provider', Types::CommitteeType do
    let(:model) { create(:committee) }
  end

  it_behaves_like 'a relay node provider', Types::HearingType do
    let(:model) { create(:hearing) }
  end

  it_behaves_like 'a relay node provider', Types::BillType do
    let(:model) { create(:bill) }
  end
end
