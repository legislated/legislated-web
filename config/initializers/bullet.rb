Rails.application.config.after_initialize do
  if Rails.env.development?
    Bullet.tap do |b|
      b.enable = true
      b.console = true
    end
  end
end
