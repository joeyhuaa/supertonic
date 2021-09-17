# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.text :email, null: false
      t.text :full_name
      t.text :uid
      t.text :avatar_url
      t.text :theme

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
