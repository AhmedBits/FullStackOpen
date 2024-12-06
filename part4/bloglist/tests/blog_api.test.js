const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

const obtainToken = async () => {
  const testUser = helper.testUser

  const response = await api
    .post('/api/login')
    .send(testUser)

  return response.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${await obtainToken()}` })
      .send(blog) 
  }
})

describe('when there are initially some blogs saved', () => {
  describe('get requests' , () => {
    test('response is in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
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

  describe('post requests', () => {
    test('successfully creates a new blog post', async () => {
      const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      }

      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${await obtainToken()}` })
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
        .set({ Authorization: `Bearer ${await obtainToken()}` })
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
        .set({ Authorization: `Bearer ${await obtainToken()}` })
        .send(blogWithoutProperties)
        .expect(400)
      
      const blogsAtEnd = await helper.blogsInDB()
      const authors = blogsAtEnd.map(b => b.author)

      authors.forEach(author => {
        assert(author !== blogWithoutProperties.author)
      })
    })
    test(`fails with 'Unauthorized' if token isnt provided`, async () => {
      const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
      
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('delete requests', () => {
    test('a blog can be deleted', async () => {
      const blogsBefore = await helper.blogsInDB()
      const blogToDelete = blogsBefore[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${await obtainToken()}` })
        .expect(204)
      
      const blogsAfter = await helper.blogsInDB()
      assert.strictEqual(blogsBefore.length, blogsAfter.length + 1)

      const ids = blogsAfter.map(b => b.id)
      assert(!ids.includes(blogToDelete.id))
    })
    test('cancels deletion if id is invalid', async () => {
      const invalidId = await helper.fakeId()
      
      await api
        .delete(`/api/blogs/${invalidId}`)
        .set({ Authorization: `Bearer ${await obtainToken()}` })
        .expect(404)
    })
    test('deletion fails when requested by invalid user', async () => {
      const blogsBefore = await helper.blogsInDB()
      const blogToDelete = blogsBefore[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `Bearer ${helper.invalidId}` })
        .expect(401)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsBefore.length)
    })
  })

  describe('put requests', () => {
    test('updates a blogs likes', async () => {
      const blogs = await helper.blogsInDB()
      const blogToUpdate = blogs[0]
      
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
      
      const savedBlog = await Blog.findById(updatedBlog.id)
      assert.strictEqual(savedBlog.likes, blogToUpdate.likes + 1)
    })
    test('cancels update if id is invalid', async () => {
      const invalidId = await helper.fakeId()
      const blog = {
        title: 'required property',
        url: 'required property'
      }

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(blog)
        .expect(404)
    })
    test('update fails when missing properties', async () => {
      const blogs = await helper.blogsInDB()
      const blogToUpdate = blogs[0]
      
      const blogWithoutProperties = {
        author: "ShouldntSave",
        likes: 3
      }
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogWithoutProperties)
        .expect(400)
      
      const blogsAtEnd = await helper.blogsInDB()
      const authors = blogsAtEnd.map(b => b.author)

      authors.forEach(author => {
        assert(author !== blogWithoutProperties.author)
      })
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})