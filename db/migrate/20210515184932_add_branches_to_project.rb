class AddBranchesToProject < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :branches, :string
  end
end
