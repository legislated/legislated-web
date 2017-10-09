class ImportBillsJob
  include Worker

  class Attributes
    attr_accessor :bill, :documents, :actions
  end

  def initialize(redis = Redis.new, service = OpenStatesService.new)
    @redis = redis
    @service = service
  end

  def perform
    import_date = @redis.get(:import_bills_job_date)&.to_time

    # collect the attributes
    parsed_attributes = @service
      .fetch_bills(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    # upsert the records
    parsed_attributes.each do |attributes|
      bill = Bill.upsert_by!(:external_id, attributes.bill)
      bill.actions.destroy_all # Dangerously skipping callbacks!!

      attributes.actions.each do |attrs|
        action_attrs = attrs.merge(bill: bill)
        Action.create!(action_attrs)
      end

      attributes.documents.each do |attrs|
        doc_attrs = attrs.merge(bill: bill)
        Document.upsert_by!(:number, doc_attrs)
      end

      # enqueue the details job for each bill
      ImportBillDetailsJob.perform_async(bill.id)
    end

    @redis.set(:import_bills_job_date, Time.zone.now)
  end

  private

  def parse_attributes(data)
    # scrape out relevant ids from the ilga source url
    source_url = data['sources'].reduce(nil) do |memo, source|
      url = source['url']
      memo || url if url.starts_with?('http://ilga.gov/legislation/BillStatus.asp')
    end

    # throw out this entry if we can't find a source url
    if source_url.nil?
      info("> failed to find ilga url for #{data['bill_id']}")
      return nil
    end

    # update the attrs map with extracted bill / document data
    attrs = Attributes.new
    response = parse_bill_attributes(source_url, data)
    attrs.bill = response['bill_attrs']

    attrs.actions = response['actions'].map do |action_data|
      parse_action_attributes(action_data)
    end

    attrs.documents = data['versions'].map do |version_data|
      parse_document_attributes(version_data, data)
    end

    attrs
  end

  def parse_bill_attributes(source_url, data)
    params = CGI.parse(URI.parse(source_url).query)
      .transform_values(&:first)

    introduced_types = [
      'bill:filed',
      'bill:introduced',
      'committee:referred',
      'governor:received'
    ]

    passed_types = [
      'committee:passed',
      'committee:passed:favorable',
      'committee:passed:unfavorable',
      'bill:passed',
      'governor:signed',
      'bill:veto_override:passed'
    ]

    failed_types = [
      'committee:failed',
      'bill:failed',
      'governor:vetoed',
      'governor:vetoed:line-item',
      'bill:veto_override:failed'
    ]

    completed_types = []
    completed_types << passed_types
    completed_types << failed_types

    introduced_actions = data['actions'].select do |action|
      is_introduction = action['type'].any? do |type|
        introduced_types.include? type
      end
      is_substantive = !action['action'].match(/(Assignments|Rules)$/)

      is_introduction && is_substantive
    end

    completed_actions = data['actions'].select do |action|
      is_completed = action['type'].any? do |type|
        completed_types.include? type
      end
      is_completed
    end

    stages = introduced_actions.map do |action|
      {
        introduced_date: action['date'],
        name: get_stage_name(action)
      }
    end

    completed_actions.map do |action|
      stage = get_stage_for_completed_action(action, stages)
      if stage.nil?
        stage = {name: get_stage_name(action)}
        stages << stage
      end
      did_pass = action['type'].any? do |type|
        passed_types.include? type
      end
      stage[:pass_fail] = did_pass ? 'pass' : 'fail'
      stage[:completed_date] = action['date']
    end

    bill_attrs = {
      external_id: params['LegId'],
      os_id: data['id'],
      raw_actions: data['actions'],
      stages: stages,
      title: data['title'],
      session_number: data['session'].gsub(/[a-z]+/, '')
    }

    # use the ilga source params to generate other useful urls
    query = params.slice('GAID', 'SessionID', 'DocTypeID', 'DocNum').to_query
    bill_attrs[:details_url] = ilga_url('legislation/billstatus.asp', query)

    # use the first primary sponsor for now
    sponsor = data['sponsors'].find { |s| s['type'] == 'primary' }
    bill_attrs[:sponsor_name] = sponsor['name'] if sponsor.present?

    {
    'bill_attrs' => bill_attrs,
    'actions' => data['actions']
    }

  end

  def get_stage_name(action)
    committe_types = [
      'committee:referred',
      'committee:passed',
      'committee:passed:favorable',
      'committee:passed:unfavorable',
      'committee:failed'
    ]

    governor_types = [
      'governor:received',
      'governor:signed',
      'governor:vetoed',
      'governor:vetoed:line-item'
    ]

    veto_types = [
      'bill:veto_override:passed',
      'bill:veto_override:failed'
    ]

    name = action['actor']
    name = action['type'].any? do |type|
      if committe_types.include? type
        name += ':committee'
      end

      if governor_types.include? type
        name = 'governor'
      end

      if veto_types.include? type
        name = 'veto'
      end

      name
    end
  end

  def get_stage_for_completed_action(completed_action, stages)
    stage_name = get_stage_name(completed_action)
    stage = stages.select do |next_stage|
      if next_stage['name'] == stage_name
        unless next_stage['introduced'] > completed_action['date']
          if stage.nil? || stage['introduced'] < next_stage['introduced']
            stage = next_stage
          end
        end
      end
      stage
    end
  end

  def parse_action_attributes(action_data)
    action_attrs = {
      name: action_data['action'],
      stage: action_data['actor'],
      action_type: action_data['type'].last,
      datetime: DateTime.parse(action_data['date'])
    }

    action_attrs
  end

  def parse_document_attributes(version_data, data)
    document_attrs = {
      os_id: version_data['doc_id'],
      number: data['bill_id'].gsub(/\s+/, ''),
      full_text_url: version_data['url'],
      is_amendment: false
    }

    document_attrs
  end

  def ilga_url(page, query)
    "http://www.ilga.gov/#{page}?#{query}"
  end

  def fields
    @fields ||= begin
      fields = %i[
        id
        bill_id
        session
        title
        chamber
        actions
        versions
        sources
        sponsors
        type
      ]

      fields.join(',')
    end
  end
end
