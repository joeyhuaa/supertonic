require 'byebug'

class ProjectController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
    @project.name = params['name']
    @project.description = params['description']

    files = []
    params['files'].each_with_index do |file, i|
      # files << {
      #   filename: params['files'][i].original_filename,
      #   tempfile: params['files'][i].tempfile # probably need to use some gem for this?
      # }
      files << file
    end
    @project.files = files
    @project.save
  end

  def update
  end

  def delete
  end
end
