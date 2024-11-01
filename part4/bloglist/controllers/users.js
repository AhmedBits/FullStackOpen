const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { 
      title: 1,
      author: 1,
      url: 1,
      likes: 1 
    })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(401).json({
      error: 'Missing username/password'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'Username/password must be atleast 3 characters'
    })
  }

  const users = await User.find({})
  const usernames = users.map(u => u.username)

  if (usernames.includes(username)) {
    return response.status(409).json({
      error: 'Username is already taken'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter