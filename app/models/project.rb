class Project < ApplicationRecord
    serialize :name, JSON
    serialize :description, JSON
    serialize :files, Array
    serialize :branches, JSON

    has_many :songs

    def song_ids
        self.songs.map{|song| song.id}
    end
end
