describe BillsActionsService do
  subject { described_class }

  describe '#has_type?' do
    it 'is false when none of the action types exists in the type definitions' do
      action_types = %w(
        bazbar:foo
        foobarbaz:barbaz
      )
      
      type_defs = %w(
        hello:world
      )

      expect(subject.has_type?(action_types, type_defs)).to eq(false)
    end

    it 'is true when at least one of the action types exists in the type definitions' do
      action_types = %w(
        bazbar:foo
        foobarbaz:barbaz
      )
      
      type_defs = %w(
        hello:world
        foobarbaz:barbaz
      )

      expect(subject.has_type?(action_types, type_defs)).to eq(true)
    end
  end

  describe '#get_stage_name' do
    it 'is `governor` when the action types include a governor stage type' do
      actor = 'Bill Murray'
      action = {
        'actor' => actor,
        'type' => [
          BillsActionsService::StageTypes::GOVERNOR[0],
          'foobarbaz:barbaz'
        ]
      }
      
      expect(subject.get_stage_name(action)).to eq('governor')
    end
    
    it 'is `<actor>:committee` when the action types include a committee stage type' do
      actor = 'Bill Murray'
      action = {
        'actor' => actor,
        'type' => [
          BillsActionsService::StageTypes::COMMITTEE[0],
          'foobarbaz:barbaz'
        ]
      }
      
      expect(subject.get_stage_name(action)).to eq("#{actor}:committee")
    end

    it 'is the actor otherwise' do
      actor = 'Bill Murray'
      action = {
        'actor' => actor,
        'type' => [
          'foobarbaz:barbaz'
        ]
      }
      
      expect(subject.get_stage_name(action)).to eq(actor)
    end
  end
  
  describe '#get_stage_for_completed_action' do
    let(:completed_action) {{
      'date' => "2017-03-08 00:00:00",
      'action' => "Assigned to Criminal Law",
      'type' => ["committee:passed"],
      'actor' => "upper"
    }}
    
    it """is the stage corresponding to the last introduced action that has the
          same stage name and was before the completed action""" do
      
      actions = [
        # matches but isn't last
        { introduced_date:  "2017-02-10 00:00:00", name: "upper:committee" },
        
        # winner winner chicken dinner
        { introduced_date:  "2017-02-11 00:00:00", name: "upper:committee" },
        
        # different stage name
        { introduced_date:  "2017-02-12 00:00:00", name: "governor" },
        
        # too late
        { introduced_date:  "2017-03-11 00:00:00", name: "upper:committee" },
      ]

      expect(subject.get_stage_for_completed_action(completed_action, actions)).to eq(actions[1])
    end
    
    it 'is nil when no corresponding introduced stage exists' do
      actions = [{
        introduced_date:  "2017-02-10 00:00:00",
        name: "governor",
      }]
      
      expect(subject.get_stage_for_completed_action(completed_action, actions)).to eq(nil)
    end
  end

  describe '#compute_stages' do
    it 'works' do
      actions_attrs = [{
        'date' => "2017-02-10 00:00:00",
        'action' => "Assigned to Criminal Law",
        'type' => ["bill:filed"],
        'actor' => "upper"
        },
        {
        'date' => "2017-02-10 00:00:00",
        'action' => "Assigned to Criminal Law",
        'type' => ["bill:reading:1"],
        'actor' => "upper"
        },
        {
        'date' => "2017-02-10 00:00:00",
        'action' => "Referred to Assignments",
        'type' => ["committee:referred"],
        'actor' => "upper"
        },
        {
        'date' => "2017-02-28 00:00:00",
        'action' => "Assigned to Criminal Law",
        'type' => ["committee:referred"],
        'actor' => "upper"
        },
        {
        'date' => "2017-03-08 00:00:00",
        'action' => "Assigned to Criminal Law",
        'type' => ["committee:passed"],
        'actor' => "upper"
        },
        {
        'actor' => "lower",
        'action' => "Assigned to Criminal Law",
        'date' => "2017-04-28 00:00:00",
        'type' => ["bill:reading:3","bill:introduced","bill:passed"],
        }]

    expected_stages = [
      {
        introduced_date: "2017-02-10 00:00:00",
        name: "upper",
      },
      {
        introduced_date: "2017-02-28 00:00:00",
        name: "upper:committee",
        completed_date: "2017-03-08 00:00:00",
        failed: false,
      },
      {
        name: "lower",
        introduced_date: "2017-04-28 00:00:00",
        completed_date: "2017-04-28 00:00:00",
        failed: false
      }]

      expect(subject.compute_stages(actions_attrs)).to contain_exactly(*expected_stages)
    end
  end
end

