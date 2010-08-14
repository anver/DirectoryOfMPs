require 'rubygems'
require 'sinatra'
require 'httparty'
require 'json'

get '/' do
  headers['Cache-Control'] = "public, max-age=#{60*60*24*100}"
  @states = get '/states'
  haml :states
end

get '/states/:state_id/mps/' do |state_id|
  @mps = get "/states/#{state_id}/mps"
  haml :mps, :layout => false
end

get '/mps/:id' do |id|
  @mp = get "/mps/#{id}"
  haml :mp, :layout => false
end

get '/search' do
  content_type :json
  get "/search/mp/#{params['term']}", false
end

def get(url, parse_json= true)
  response = HTTParty.get "#{$API_URL}#{url}.json"
  parse_json ? Crack::JSON.parse(response.body) : response.body
end