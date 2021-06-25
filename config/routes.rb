Rails.application.routes.draw do
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root to: 'pages#home'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    get 'users/sign_in', to: 'users/sessions#new', as: :new_user_session
    get 'users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
  end

  get 'api/song/get'
  get 'api/song/post'
  get 'api/song/update'
  get 'api/song/delete'

  get 'api/projects', :to => 'project#get_all'
  post 'api/project/new', :to => 'project#new'
  get 'api/project/:id', :to => 'project#get'
  delete 'api/projects/:id/destroy', :to => 'project#destroy'
  put 'api/project/:id/newbranch', :to => 'project#new_branch'
  put 'api/project/:id/deletebranch', :to => 'project#delete_branch'
  put 'api/project/update', :to => 'project#update'

  get 'api/song/:id', :to => 'song#get'

  get '*path', :to => 'pages#home'
end
