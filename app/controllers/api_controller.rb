class ApiController < ApplicationController
  def execute
    result = GraphSchema.execute(params[:query],
      variables: parse_variables(params[:variables]),
      context: {}
    )

    logger.info("> result: ")
    logger.info(result, :info)

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
end
