FactoryBot.define do
  factory :bill do
    ilga_id { Faker::Number.unique.number(5) }
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    title { Faker::Company.catch_phrase }
    summary { Faker::Lorem.paragraph(6) }
    session_number { 99 }
    sponsor_name { Faker::Name.name }
    details_url { Faker::Internet.url }
    slip_url { Faker::Internet.url }
    slip_results_url { Faker::Internet.url }

    transient do
      last_actor nil
      last_action_date nil
      hearing_date nil
    end

    hearing do
      hearing_date.nil? ? build(:hearing) : build(:hearing, date: hearing_date)
    end

    actions do
      last_action_date.nil? ? [] : attributes_for_list(:action, 1, date: last_action_date)
    end

    steps do
      last_actor.nil? ? [] : attributes_for_list(:step, 1, actor: last_actor)
    end

    trait :with_associations do
      with_documents
      with_steps
    end

    trait :with_documents do
      documents { build_list(:document, 1, number: number) }
    end

    trait :with_steps do
      actions { attributes_for_list(:action, 1) }
      steps { attributes_for_list(:step, 1) }
    end

    trait :with_step_sequence do
      actors = [
        Step::Actors::LOWER,
        Step::Actors::UPPER
      ]

      steps do
        sequence = actors.sample(1 + rand(2))
        sequence << Step::Actors::GOVERNOR if sequence.count == 2 && rand(2).zero?

        sequence.each_with_object([]) do |actor, memo|
          memo << attributes_for(:step, :introduced, actor: actor)
          break(memo) if rand(2).zero?
          memo << attributes_for(:step, :resolved, actor: actor)
        end
      end
    end

    factory :open_states_bill do
      with_steps

      transient do
        hearing nil
        summary nil
        slip_url nil
        slip_results_url nil
      end

      initialize_with do
        OpenStates::ParseBill::Bill.new(
          ilga_id,
          os_id,
          actions,
          steps,
          title,
          session_number,
          details_url,
          sponsor_name
        )
      end
    end

    factory :ilga_hearing_bill do
      transient do
        os_id nil
        number nil
        title nil
        summary nil
        session_number nil
        sponsor_name nil
        details_url nil
        slip_url nil
        slip_results_url nil
        hearing nil
        actions nil
        steps nil
      end

      initialize_with do
        Ilga::ScrapeHearingBills::Bill.new(
          ilga_id,
          slip_url,
          slip_results_url
        )
      end
    end
  end
end
