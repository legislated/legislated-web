module Request
  module OpenStates
    extend ActiveSupport::Concern

    included do
      include ::Request

      base_uri(
        'https://openstates.org/api/v1'
      )

      headers({
        'X-API-KEY': ENV['OPEN_STATES_KEY']
      })
    end

    class_methods do
      def fields(keys)
        default_params(fields: keys.join(','))
      end
    end
  end
end
