class Branch < ApplicationRecord
  belongs_to :project
  has_many :songs

  def addSong(song)

  end
end
