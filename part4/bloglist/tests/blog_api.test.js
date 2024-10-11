const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs saved', () => {
  test('response is in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('has correct number of blogs', async () => {
    const blogsAtEnd = await helper.blogsInDB()
    
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('gives each blog an "id" field', async () => {
    const blogsAtEnd = await helper.blogsInDB()

    blogsAtEnd.forEach(blog => {
      assert('id' in blog)
    })
  })

  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDB()
    const titles = blogsAtEnd.map(b => b.title)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert(titles.includes(newBlog.title))
  })
  test('creates a "likes" property when missing', async () => {
    const blogWithoutLikes = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }
    
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDB()

    blogsAtEnd.forEach(blog => {
      assert('likes' in blog)
    })
  })
  test('responds with 400 error code when missing properties', async () => {
    const blogWithoutProperties = {
      author: "ShouldntSave",
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutProperties)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDB()
    const authors = blogsAtEnd.map(b => b.author)

    authors.forEach(author => {
      assert(author !== blogWithoutProperties.author)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})