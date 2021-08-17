class Branch < ApplicationRecord
  belongs_to :project
  has_many :songs

  def addSong(song)
    self.songs.push(song)
    self.save!
  end
end
