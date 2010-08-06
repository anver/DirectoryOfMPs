require 'rubygems'
require 'sinatra'
require 'httparty'

get '/' do
  redirect '/states'
end

get "/states" do
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

def get url
  response = HTTParty.get "#{$API_URL}#{url}.json"
  Crack::JSON.parse(response.body)
end