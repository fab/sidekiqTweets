get '/' do
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  session.clear
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # our request token is only valid until we use it to get an access token, so let's delete it from our session
  @user = User.where(username: @access_token.params[:screen_name]).first_or_create(oauth_token: @access_token.token, oauth_secret: @access_token.secret)
  @user.update_attributes(oauth_token: @access_token.token, oauth_secret: @access_token.secret)
  session[:user_id] = @user.id
  session.delete(:request_token)
  # at this point in the code is where you'll need to create your user account and store the access token
  erb :index
end


post '/tweet' do
  user = User.find(session[:user_id])
  p user
  t_user = Twitter::Client.new(oauth_token: user.oauth_token, oauth_token_secret: user.oauth_secret)
  p t_user
  t_user.update(params[:tweet])
  puts "#{params[:tweet]} was sent"
  erb :index
end
