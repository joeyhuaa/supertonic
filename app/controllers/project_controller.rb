require 'byebug'

# MIGRATION DB SHENANIGANS
# https://guides.rubyonrails.org/association_basics.html

# 1. Rollback create songs and create projects
# 2. Add belongs_to lines to them
# 3. Migrate

class ProjectController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /project/:id
  def index
    @project = Project.find(params[:id])

    # convert Song models into objects
    @songs = @project.files.map{|file| 
      {
        :id => file['id'],
        :name => file['name'],
        :date_created => file['created_at'],
        :date_updated => file['updated_at'],
        # pass in time duration here somehow
      }
    }

    render :json => {:status => 'ok'}
  end

  # POST api/projects/new
  def new
    puts 'NEW PROJECT'
    puts params
    @user = current_user
    @project = @user.projects.create(created_at: Time.now)

    # name
    @project.name = "Untitled Project"

    # description
    @project.description = ""

    # branches
    @project.branches = {
      # 'main' => @project.files.map{|file| file['id']},
      'main' => []
    }

    @project.save

    render :json => {:projId => @project.id}
  end

  # PUT api/projects/:id/songs
  def add_songs
    @project = Project.find(params[:id])
    @project.addSongs(params[:files], params[:branch])
    render :json => {:status => 200}
  end

  # GET api/projects/:id
  def get
    @project = Project.find(params[:id])
    render :json => @project
  end

  def get_all
    puts "/projects"
    render :json => {:projects => current_user.projects}
  end

  # PUT api/projects/:id/newbranch
  def new_branch
    puts 'NEW BRANCH'
    @project = Project.find(params[:id])
    @project.branches[ params[:branch] ] = []
    @project.save
    render :json => {status: 200}
  end

  # PUT api/projects/:id/deletebranch
  def delete_branch
  end

  def update
  end 

  # DELETE api/projects/:id/destroy
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :json => {status: 200}
  end

  private

end
