class ApiController < ActionController::API
  def execute
    result = GraphSchema.execute(params[:query], {
      context: parse_context,
      variables: parse_variables(params[:variables]),
      only: GraphWhitelist
    })

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
    { is_admin: request.headers['Authorization'] == ENV['ADMIN_CREDENTIALS'] }
  end
end
