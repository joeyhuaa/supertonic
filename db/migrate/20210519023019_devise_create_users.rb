# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :full_name
      t.string :uid
      t.string :avatar_url
      t.string :theme

      t.timestamps null: false
    end

    add_index :users, :email, unique: true

    create_table :projects do |t|
      t.string :name
      t.string :description
      t.string :branches
      t.string :songs

      t.timestamps
      t.belongs_to :user
    end

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
      t.belongs_to :branch
    end
  end
end
