class Viewer
  ID = 'VIEWER'.freeze

  include Singleton

  def id
    Viewer::ID
  end
end
