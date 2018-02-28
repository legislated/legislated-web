Rails.application.config.after_initialize do
  return unless Rails.env.development?

  Bullet.tap do |b|
    b.enable = true
    b.console = true
  end
end
