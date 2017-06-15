class CreateUserDetails < ActiveRecord::Migration
  def change
    create_table :user_details do |t|
      t.string :username
      t.string :victory
      t.string :defeat
      t.integer :wpm
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
