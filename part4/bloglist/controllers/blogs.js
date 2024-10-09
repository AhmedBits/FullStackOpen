const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body

  if (!('title' in newBlog && 'url' in newBlog)) {
    return response.status(400).end()
  }

  const blogToSave = 'likes' in newBlog
    ? new Blog(newBlog) : new Blog({...newBlog, likes: 0})

  const savedBlog = await blogToSave.save()
  return response.status(201).json(savedBlog)
})

module.exports = blogsRouter