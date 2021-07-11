class Project < ApplicationRecord
    belongs_to :user
    has_many :songs, dependent: :delete_all

    serialize :name, JSON
    serialize :description, JSON
    serialize :files, Array
    serialize :branches, JSON

    def song_ids
        self.songs.map{|song| song.id}
    end

    def addSongs(files, branch)
        JSON.parse(files).each do |file|
            @song = self.songs.create(created_at: Time.now)
            @song.name = file['name']
            @song.b64 = file['b64']
            @song.save
            self.files << @song
            self.branches[branch].push(@song.id)
        end
        self.save
    end
end
