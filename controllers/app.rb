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

def get url
  response = HTTParty.get "http://api.myminister.info#{url}.json"
  Crack::JSON.parse(response.body)
end