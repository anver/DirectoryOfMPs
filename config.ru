require 'rubygems'
root_dir = File.dirname(__FILE__) 
public_path = File.join(root_dir, "public")
set :root,  root_dir
set :public, public_path
use Rack::Static, :urls => ["/css", "/images", '/facebox', '/js', '/html'], :root => public_path
run Sinatra::Application

