describe BillsActionsService do
  subject { described_class }

  describe '#get_stage_name' do
    it 'works' do
    end
  end
  
  describe '#get_stage_for_completed_action' do
    it 'works' do
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

