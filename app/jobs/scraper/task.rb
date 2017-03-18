require "capybara"

module Scraper
  class Task
    def initialize
      # fake user agent to avoid getting redirected to error pages
      # find alternatives here: https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
      page.driver.headers = {
        "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
      }
    end

    # logging / errors
    class Error < StandardError; end

    def info(message)
      Rails.logger.info(message)
    end

    def debug(message)
      Rails.logger.debug(message)
    end

    def task_name
      self.class.name
    end

    # capybara
    def page
      Capybara.current_session
    end

    def wait_for_ajax
      Timeout.timeout(Capybara.default_max_wait_time) do
        active = page.evaluate_script('jQuery.active')
        until active == 0
          active = page.evaluate_script('jQuery.active')
        end
      end
    rescue
      raise Error, "#{task_name}: timed-out waiting ajax to finish"
    end
  end
end
