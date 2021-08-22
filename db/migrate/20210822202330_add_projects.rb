class AddProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.string :branches
      t.string :songs

      t.timestamps
      t.belongs_to :user
    end
  end
end
