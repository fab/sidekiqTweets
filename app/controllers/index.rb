get '/' do
  erb :index
end

get '/sign_in' do
  session.clear
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  @user = User.where(username: @access_token.params[:screen_name]).first_or_create(oauth_token: @access_token.token, oauth_secret: @access_token.secret)
  @user.update_attributes(oauth_token: @access_token.token, oauth_secret: @access_token.secret)
  session[:user_id] = @user.id
  session.delete(:request_token)
  erb :index
end


post '/tweet' do
  user = User.find(session[:user_id])
  user.tweet(params[:tweet])
  puts "#{params[:tweet]} was sent"
  erb :index
end

# this command runs the siqekiq server
# $ bundle exec sidekiq -r./config/environment.rb

