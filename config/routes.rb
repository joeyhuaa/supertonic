Rails.application.routes.draw do
  post 'project/new', :to => 'project#new'
  put 'project/update', :to => 'project#update'
  delete 'project/delete', :to => 'project#delete'
  
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root 'pages#home'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
