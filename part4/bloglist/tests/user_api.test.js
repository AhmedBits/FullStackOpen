const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'cool dude',
      name: 'hello',
      password: 'hidden',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, 1 + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails when missing properties', async () => {
    const newUser = {
      name: 'randomName'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
    
    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('creation fails when under character requirement', async () => {
    const newUser = {
      username: 'sm',
      name: 'another',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('creation fails when username already exists', async () => {
    const newUser = {
      username: 'root',
      name: 'duplicate',
      password: 'hunter2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
    
    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, 1)

    const usernames = usersAtEnd.map(u => u.username)
    const usersNamedRoot = usernames.filter(u => u.includes('root'))
    assert.strictEqual(usersNamedRoot.length, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})