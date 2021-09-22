# MIGRATION DB SHENANIGANS
# https://guides.rubyonrails.org/association_basics.html

# 1. Rollback create songs and create projects
# 2. Add belongs_to lines to them
# 3. Migrate

require 'byebug'

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
    @user = current_user
    @project = @user.projects.create(id: params[:id])

    # * name
    @project.name = "Untitled Project"

    # * description
    @project.description = ""

    # * branch
    @project.addBranch('main')

    @project.save!

    render :json => @project
  end

  # PUT api/projects/:id/songs
  def add_songs
    @project = Project.find(params[:id])
    @project.addSongs(params[:files], params[:branchName])
    render :json => {:status => 200}
  end

  # GET api/projects/:id
  def get
    @project = Project.find(params[:id])
    # byebug
    render :json => @project
  end

  # GET api/projects
  def get_all
    render :json => current_user.projects.reverse
  end

  # PUT api/projects/:id/newbranch
  def new_branch
    @project = Project.find( params[:projId] )
    @project.addBranch( params[:newBranchName], params[:sourceBranchName] )
    render :json => @project
  end

  # PUT api/projects/:id/deletebranch
  def delete_branch
  end

  # DELETE api/projects/:id/destroy
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :json => {status: 200}
  end

  def update
    @project = Project.find(params[:id])

    if params[:name]
      @project.name = params[:name]
    end

    @project.save
    render :json => @project
  end

  private

end
