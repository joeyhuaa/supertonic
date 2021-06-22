Rails.application.routes.draw do
  # set root of the app to be pages controller, home action
  # this is the landing view basically
  root to: 'pages#home'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    get 'users/sign_in', to: 'users/sessions#new', as: :new_user_session
    get 'users/sign_out', to: 'users/sessions#destroy', as: :destroy_user_session
  end

  get 'projects', :to => 'pages#projects'

  get 'song/get'
  get 'song/post'
  get 'song/update'
  get 'song/delete'

  post 'project/new', :to => 'project#new'
  get 'project/:id', :to => 'project#get'
  delete 'projects/:id/destroy', :to => 'project#destroy'
  put 'project/:id/newbranch', :to => 'project#new_branch'
  put 'project/:id/deletebranch', :to => 'project#delete_branch'
  put 'project/update', :to => 'project#update'

  get 'song/:id', :to => 'song#get'

  get '*path', :to => 'pages#home'
end
