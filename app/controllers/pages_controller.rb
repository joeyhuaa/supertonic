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
  def landing
  end

  def home
    # get data thats needed when app first loads
    @projects = Project.all.map{|p| 
      {
        :id => p.id,
        :name => p.name
      }
    }
  end
end
