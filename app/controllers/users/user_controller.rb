class Users::UserController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  # api/user/theme
  def theme
    render :json => {theme: current_user.theme}
  end

  # api/user/change_theme
  def change_theme
    @user = current_user
    @user.theme = params[:theme]
    @user.save
    render :json => {theme: @user.theme}
  end
end
