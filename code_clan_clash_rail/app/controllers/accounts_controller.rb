class AccountsController < ApplicationController
  before_action :authenticate_user!
  def create
    accounts = UserDetail.create!({username: params[:username], victory: params[:victory], defeat: params[:defeat], wpm: params[:wpm], user_id: params[:user_id]})

    render :json => accounts
  end

  def index
    accounts = current_user.accounts
    render :json => accounts
  end

end