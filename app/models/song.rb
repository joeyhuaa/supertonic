class Song < ApplicationRecord
  belongs_to :project
  belongs_to :branch
end
