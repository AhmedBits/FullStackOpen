const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('response in in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('has correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('each blog has an "id" field', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.ok(Object.hasOwn(blog, 'id'))
  })
})

after(async () => {
  await mongoose.connection.close()
})