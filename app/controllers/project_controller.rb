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

  # POST /project/new
  def new
    @user = current_user
    @project = @user.projects.create(created_at: Time.now)

    # name
    @project.name = params['name']

    # description
    @project.description = params['description']

    # files
    files = []
    JSON.parse(params['files']).each do |file|
      @song = @project.songs.create(created_at: Time.now)
      @song.name = file['name']
      @song.b64 = file['b64']
      @song.save
      files << @song
    end
    @project.files = files
    @project.save

    # branches
    @project.branches = {
      'main' => @project.files.map{|file| file['id']},
      'mixes' => []
    }
    @project.save
  end

  # GET /project/:id
  def get
    @project = Project.find(params[:id])

    # # convert Song models into objects
    # # BUG FIGURE OUT WHY ALL OF THIS IS NULL 
    # @songs = @project.files.map{|file| 
    #   {
    #     :id => file['id'],
    #     :name => file['name'],
    #     :date_created => file['created_at'],
    #     :date_updated => file['updated_at'],
    #     # pass in time duration here somehow
    #   }
    # }
    # render :json => {
    #   :id => params[:id], 
    #   :name => @project.name,
    #   :songs => @songs,
    #   :branches => @project.branches
    # }
    render :json => @project
  end

  def get_all
    puts "/projects"
    render :json => {:projects => current_user.projects}
  end

  # PUT /project/:id/newbranch
  def new_branch
    puts 'NEW BRANCH'
    puts params
    @project = Project.find(params[:id])
    @project.branches[ params[:branch] ] = []
    @project.save
    render :json => {status: 200}
  end

  # PUT /project/:id/deletebranch
  def delete_branch
  end

  def update
  end 

  # DELETE /projects/:id/destroy
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :json => {status: 200}
  end

end
