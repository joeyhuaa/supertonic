class AddBranchesAndSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :branches do |t|
      t.string :name
      t.string :songs

      t.timestamps
      t.belongs_to :project
    end

    create_table :songs do |t|
      t.string :name
      t.string :b64
      t.string :duration

      t.timestamps
      t.belongs_to :project
    end

    # join table for has_many_and_belongs_to for Branch and Song
    create_table :branches_songs, :id => false do |t|
      t.belongs_to :branch
      t.belongs_to :song
    end
    
  end
end
