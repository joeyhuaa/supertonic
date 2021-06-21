=begin

DATA FETCHING
get project
get commit
post project
post commit --> put project
put commit 
delete proj
delete commit

=end

class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def landing
  end

  def home
    # get data thats needed when app first loads
    @user = current_user
    @projects = @user.projects
  end
end
