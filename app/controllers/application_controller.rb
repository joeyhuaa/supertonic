class ApplicationController < ActionController::Base
    protect_from_forgery
    before_action :authenticate_user!

    def index
        @user = current_user
    end
end
