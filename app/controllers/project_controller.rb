require 'byebug'

class ProjectController < ApplicationController

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
    @project = Project.new

    # name
    @project.name = params['name']

    # description
    @project.description = params['description']

    # files
    files = []
    JSON.parse(params['files']).each do |file|
      @song = Song.new
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
    render :json => {
      :id => params[:id], 
      :name => @project.name,
      :songs => @songs,
      :branches => @project.branches
    }
  end

  # PUT /project/:id/newbranch
  def new_branch
    @project = Project.find(params[:id])
    @project.branches[params[:branch]]
  end

  # PUT /project/:id/deletebranch
  def delete_branch
  end

  def update
  end 

  def delete
  end

end
