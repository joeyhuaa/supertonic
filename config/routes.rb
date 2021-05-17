Rails.application.routes.draw do
  get 'song/get'
  get 'song/post'
  get 'song/update'
  get 'song/delete'

  post 'project/new', :to => 'project#new'
  get 'project/:id', :to => 'project#get'
  put 'project/:id/newbranch', :to => 'project#new_branch'
  put 'project/:id/deletebranch', :to => 'project#delete_branch'
  put 'project/update', :to => 'project#update'
  delete 'project/delete', :to => 'project#delete'

  get 'song/:id', :to => 'song#get'
  
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root 'pages#home'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
