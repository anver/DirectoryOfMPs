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
  haml :mps
end

get '/mps/:id' do |id|
  @mp = get "/mps/#{id}"
  haml :mp
end

def get url
  response = HTTParty.get "http://api.myminister.info#{url}.json"
  p "NEW REQUEST<<<<<<<<<<<<http://api.myminister.info#{url}.json>>>"
  p response.body.inspect
  Crack::JSON.parse(response.body)
end