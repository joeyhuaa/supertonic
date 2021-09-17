class SongController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  # GET 'api/songs/:id'
  def get
    @song = Song.find(params['id'])
    render :json => {
      :song => @song
    }
    # todo - render :json => @song
  end

  def post
  end

  def update
  end

  # DELETE 'api/songs/:id/destroy'
  def destroy
    puts 'DESTROY SONG'
    puts params
    @song = Song.find(params[:id])
    @song.destroy
    render :json => {
      projectId: params[:projectId],
      destroyed: @song.name,
    }
  end
end
