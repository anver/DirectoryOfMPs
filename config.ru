require 'rubygems'
require 'sinatra'
require 'json'
require './controllers/app'


root_dir = File.dirname(__FILE__) 
public_path = File.join(root_dir, "public")
set :root,  root_dir
set :public, public_path
set :views => File.join(root_dir,'views')
set :app_file, File.join(root_dir, 'controllers','app.rb')
set :sessions, false

disable :run, :reload 
use Rack::Static, :urls => ["/css", "/images"], :root => public_path

configure :development do
  $API_URL = "http://localhost:3000"
end

configure :production do
  $API_URL = "http://api.myminister.info"
end

run Sinatra::Application

