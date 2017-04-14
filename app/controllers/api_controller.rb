class ApiController < ApplicationController
  def execute
    result = GraphSchema.execute(params[:query], {
      variables: parse_variables(params[:variables]),
      context: parse_context
    })

    logger.info('> result: ')
    logger.info(result)

    render json: result
  end

  private

  def parse_variables(variables)
    case variables
    when String
      variables.present? ? JSON.parse(variables) : {}
    when Hash, ActionController::Parameters
      variables
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables}"
    end
  end

  def parse_context
    {}
  end
end
