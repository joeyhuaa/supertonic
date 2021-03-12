class Project < ApplicationRecord
    serialize :name, JSON
    serialize :description, JSON
    serialize :files, Array
end
