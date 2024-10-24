const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body

  if (!('title' in newBlog && 'url' in newBlog)) {
    return response.status(400).end()
  }

  const blogToSave = 'likes' in newBlog
    ? new Blog(newBlog) : new Blog({...newBlog, likes: 0})

  const savedBlog = await blogToSave.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  const updatedBlog = request.body

  if (blogToUpdate) {
    const result = await Blog
      .findByIdAndUpdate(blogToUpdate.id, updatedBlog, { new: true })

    return response.status(200).json(result)
  }
  response.status(404).end()
})

module.exports = blogsRouter