class Song < ApplicationRecord
  belongs_to :project
  has_and_belongs_to_many :branch
end
