require 'byebug'

class ProjectController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
    @project.name = params['name']
    @project.description = params['description']
    @project.files = JSON.parse(params['files'])
    @project.save
  end

  def update
  end

  def delete
  end
end
