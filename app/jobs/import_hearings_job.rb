class ImportHearingsJob < ApplicationJob
  queue_as :default

  def perform
    "Hello, world"
  end
end
