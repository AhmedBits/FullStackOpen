const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const newBlog = request.body

  const blogToSave = Object.hasOwn(newBlog, 'likes')
      ? new Blog(newBlog) : new Blog({...newBlog, likes: 0})

  const savedBlog = await blogToSave.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter