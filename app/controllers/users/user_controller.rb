class Users::UserController < ApplicationController
  skip_before_action :verify_authenticity_token

  def change_theme
    @user = current_user
    @user.theme = params[:theme]
    @user.save
    render :json => {status: 200}
  end
end
