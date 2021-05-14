class SongController < ApplicationController
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
