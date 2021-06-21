class SongController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  # GET '/song/:id'
  def get
    @song = Song.find(params['id'])
    render :json => {
      :song => @song
    }
  end

  def post
  end

  def update
  end

  def delete
  end
end
