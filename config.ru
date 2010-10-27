# Helpful when hosting locally.

require 'rubygems'
require 'sinatra'

use Rack::Static, :urls => ["/css", "/html", "/js", "/images", "/support"]

run Sinatra::Application

get '/' do
  File.read(File.join('html', 'index.html'))
end
