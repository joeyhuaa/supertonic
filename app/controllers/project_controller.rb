require 'byebug'

class ProjectController < ApplicationController
  def index
    @projects = Project.all
  end

  # POST /project/new
  def new
    @project = Project.new
    @project.name = params['name']
    @project.description = params['description']
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
  end

  def update
  end 

  def delete
  end

  # GET /project/:id
  def get
    @project = Project.find(params[:id])
    @songs = @project.files.map{|file| 
      {
        :id => file['id'],
        :name => file['name']
      }
    }
    render :json => {
      :id => params[:id], 
      :name => @project.name,
      :songs => @songs
    }
  end
end
