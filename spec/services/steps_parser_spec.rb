describe StepsParser do
  subject { described_class.new }

  describe '#parse' do
    it 'parses action attributes into steps' do
      actions = [{
        'date' => '2017-02-10 00:00:00',
        'action' => 'Assigned to Criminal Law',
        'type' => ['bill:filed'],
        'actor' => 'upper'
      }, {
        'date' => '2017-02-10 00:00:00',
        'action' => 'Assigned to Criminal Law',
        'type' => ['bill:reading:1'],
        'actor' => 'upper'
      }, {
        'date' => '2017-02-10 00:00:00',
        'action' => 'Referred to Assignments',
        'type' => ['committee:referred'],
        'actor' => 'upper'
      }, {
        'date' => '2017-02-28 00:00:00',
        'action' => 'Assigned to Criminal Law',
        'type' => ['committee:referred'],
        'actor' => 'upper'
      }, {
        'date' => '2017-03-08 00:00:00',
        'action' => 'Assigned to Criminal Law',
        'type' => ['committee:passed'],
        'actor' => 'committee'
      }, {
        'actor' => 'lower',
        'action' => 'Assigned to Criminal Law',
        'date' => '2017-04-28 00:00:00',
        'type' => ['bill:reading:3', 'bill:introduced', 'bill:passed']
      }, {
        "date": '2017-06-05 00:00:00',
        "action": 'Sent to the Governor',
        "type": ['governor:received'],
        "actor": 'lower'
      }, {
        "date": '2017-06-09 00:00:00',
        "action": 'Governor Approved',
        "type": ['governor:signed'],
        "actor": 'lower'
      }]

      expect(subject.parse(actions)).to eq([{
        actor: 'upper',
        action: 'introduced',
        resolution: 'none',
        date: '2017-02-10T00:00:00-06:00'
      }, {
        actor: 'upper:committee',
        action: 'introduced',
        resolution: 'none',
        date: '2017-02-28T00:00:00-06:00'
      }, {
        actor: 'upper:committee',
        action: 'resolved',
        resolution: 'passed',
        date: '2017-03-08T00:00:00-06:00'
      }, {
        actor: 'lower',
        action: 'introduced',
        resolution: 'none',
        date: '2017-04-28T00:00:00-05:00'
      }, {
        actor: 'lower',
        action: 'resolved',
        resolution: 'passed',
        date: '2017-04-28T00:00:00-05:00'
      }, {
        actor: 'governor',
        action: 'introduced',
        resolution: 'none',
        date: '2017-06-05T00:00:00-05:00'
      }, {
        actor: 'governor',
        action: 'resolved',
        resolution: 'signed',
        date: '2017-06-09T00:00:00-05:00'
      }])
    end
  end
end
