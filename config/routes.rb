Rails.application.routes.draw do
  get 'song/get'
  get 'song/post'
  get 'song/update'
  get 'song/delete'
  post 'project/new', :to => 'project#new'
  put 'project/update', :to => 'project#update'
  delete 'project/delete', :to => 'project#delete'
  get 'project/:id', :to => 'project#get'

  get 'song/:id', :to => 'song#get'
  
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root 'pages#home'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
