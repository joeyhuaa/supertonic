class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  def self.from_google(params)
    create_with(
      uid: params[:uid], 
      full_name: params[:full_name], 
      avatar_url: params[:avatar_url]
    ).find_or_create_by!(email: params[:email])
  end
end
