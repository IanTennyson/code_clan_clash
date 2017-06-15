# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


UserDetail.destroy_all()
User.destroy_all()

user_one = User.create({
  email: "Ian@gmail.com",
  password: 12345678,
  password_confirmation: 12345678
  })

user_one.user_details.create({
  username: "Ian",
  victory: "Yay",
  defeat: "Boo",
  wpm: 100,
  })

