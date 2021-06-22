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

  def home
    # get data thats needed when: user logs in, or project is added/deleted
    @user = current_user
    @projects = @user.projects
  end

  def projects
    puts "/projects"
    render :json => {:projects => current_user.projects}
  end

end
