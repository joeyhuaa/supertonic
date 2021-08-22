class Project < ApplicationRecord
    belongs_to :user
    has_many :songs, dependent: :delete_all
    has_many :branches, dependent: :delete_all

    serialize :name, JSON
    serialize :description, JSON

    def song_ids
      self.songs.map{|song| song.id}
    end

    def addBranch(newBranchName, sourceBranchName = nil)
      @branch = self.branches.create(created_at: Time.now)
      @branch.name = newBranchName

      if sourceBranchName
        @branch.songs = self.branches.find_by(name: sourceBranchName).songs
      end
      
      @branch.save!
      self.save!
    end

    def addSongs(files, branchName)
      JSON.parse(files).each do |file|
        @song = self.songs.create(created_at: Time.now)
        @song.name = file['name']
        @song.b64 = file['b64']
        @song.duration = file['duration']
        @song.save! 

        @branch = self.branches.find_by(name: branchName)
        @branch.addSong(@song)
      end
      self.save!
    end
end
