class Project < ApplicationRecord
    serialize :name, JSON
    serialize :description, JSON
    serialize :files, Array
    serialize :branches, JSON
end
