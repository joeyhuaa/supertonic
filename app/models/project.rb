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
end
