Rails.application.routes.draw do
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root to: 'pages#home'

  # devise_for :users,
  #   :skip => [:sessions, :omniauth_callbacks]
  
  # as user do
  #   get 'users/sign_in', to: 'users/sessions#new', as: :new_user_session
  #   get 'users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
  #   put 'api/user/change_theme', :to => 'users/user#change_theme'
  # end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    get 'users/sign_in', :to => 'users/sessions#new', as: :new_user_session
    get 'users/sign_out', :to => 'users/sessions#destroy', as: :destroy_user_session
    put 'api/user/change_theme', :to => 'users/user#change_theme'
    get 'api/user/theme', :to => 'users/user#theme'
  end

  # api
  get 'api/songs/:id', :to => 'song#get'
  delete 'api/songs/:id/destroy', :to => 'song#destroy'

  get 'api/projects', :to => 'project#get_all'
  post 'api/projects/new', :to => 'project#new'
  get 'api/projects/:id', :to => 'project#get'
  put 'api/projects/:id/add_songs', :to => 'project#add_songs'
  put 'api/projects/:id/update', :to => 'project#update'
  delete 'api/projects/:id/destroy', :to => 'project#destroy'
  put 'api/projects/:id/newbranch', :to => 'project#new_branch'
  put 'api/projects/:id/deletebranch', :to => 'project#delete_branch'

  get '*path', :to => 'pages#home'
end
