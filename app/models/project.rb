class Project < ApplicationRecord
    belongs_to :user
    has_many :songs, dependent: :delete_all
    has_many :branches, dependent: :delete_all

    serialize :name, JSON
    serialize :description, JSON

    def song_ids
      self.songs.map{|song| song.id}
    end

    def addBranch(newBranchName, sourceId = nil)
      @branch = self.branches.create(created_at: Time.now)
      @branch.name = newBranchName

      if sourceId
        @branch.songs = self.branches.find(sourceId).songs
      end
      
      @branch.save
      self.save
    end

    def addSongs(files, branch)
      JSON.parse(files).each do |file|
        @song = self.songs.create(created_at: Time.now)
        @song.name = file['name']
        @song.b64 = file['b64']
        @song.save
        puts 'SONG'
        puts @song.name
        self.branches.find_by(name: branch).songs.create(created_at: Time.now)
      end
      self.save
    end
end
