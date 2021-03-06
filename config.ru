# Helpful when hosting locally.

require 'rubygems'
require 'sinatra'

use Rack::Static, :urls => ["/css", "/html", "/js", "/images", "/support"]

run Sinatra::Application

get '/' do
  content_type 'text/html'  
  response.headers['Cache-Control'] = "public, max-age=#{60*60*24*356*3}"
  File.read(File.join('html', 'index.html'))
end
