Rails.application.routes.draw do
  get 'tonic/project'
  get 'tonic/new'
  get 'tonic/update'
  get 'tonic/delete'
  # set root of the app to be pages controlleer, home action
  # this is the landing view basically
  root 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
