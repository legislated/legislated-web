module WithChamber
  extend ActiveSupport::Concern

  included do
    enum chamber: Chamber.all
  end
end
