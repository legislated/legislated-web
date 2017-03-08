# add env passwords into ~/.bash_profile

require 'capybara'
require 'capybara/dsl'

require 'capybara/poltergeist'

include Capybara::DSL
Capybara.default_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {js_errors: false})
end

Capybara.default_driver = :poltergeist
page.driver.headers = { "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36" }

def take_screenshot(page, title='screenshot.png')
  page.save_screenshot(title)
end

# metadata: which ones?

def scrape_witness_form_links(href)
  visit href
  
  witness_form_hrefs = page.find_all('.slipiconbutton').map {|a_tag| a_tag['href'] }
  next_page_anchor_tag = page.find('.t-arrow-next').first(:xpath, './/..')
  has_next_page = !next_page_anchor_tag.has_css?('.t-state-disabled') #&& page.first('.t-state-disabled').nil?
  require 'pry'; binding.pry
  if has_next_page
    next_href = next_page_anchor_tag['href']
    return witness_form_hrefs + scrape_witness_form_links(next_href)
  else 
    return witness_form_hrefs
  end
end

# 1. Go to Committee Hearings
visit "http://my.ilga.gov/Hearing/AllHearings?chamber=H"
sleep 7 # required

# 4. Build List of committees to scrape
committee_hearing_hrefs = page.find_all('.t-last a').map {|anchor_tag| anchor_tag['href']}

# 5. For each committee, find potential witness link
info_array = []
committee_hearing_hrefs.each do |c_href|
  info = scrape_witness_form_links(c_href)
  require 'pry'; binding.pry
  info_array << info
end

# 6. Find witness link title, link, and if it exists