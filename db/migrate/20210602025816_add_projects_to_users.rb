class AddProjectsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :projects, :string
  end
end
