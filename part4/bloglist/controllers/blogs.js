const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user' , {
      username: 1,
      name: 1
    })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const newBlog = request.body

  if (!('title' in newBlog && 'url' in newBlog)) {
    return response.status(400).json({
      error: 'Missing title/url'
    })
  }

  const user = request.user
  newBlog.user = user.id

  const blogToSave = 'likes' in newBlog
    ? new Blog(newBlog) : new Blog({...newBlog, likes: 0})

  const savedBlog = await blogToSave.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({
      error: 'Nonexistent Blog'
    })
  }

  const user = request.user
  if (blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'Action limited to blog creator'
    })
  }

  await Blog.findByIdAndDelete(blogToDelete.id)
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) {
    return response.status(404).json({
      error: 'Nonexistent Blog'
    })
  }
  
  const updatedBlog = request.body
  if (!('title' in updatedBlog && 'url' in updatedBlog)) {
    return response.status(400).json({
      error: 'Missing title/url'
    })
  }

  const user = request.user
  if (blogToUpdate.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'Action limited to blog creator'
    })
  }

  const result = await Blog
    .findByIdAndUpdate(blogToUpdate.id, updatedBlog, { new: true })

  return response.status(200).json(result)
})

module.exports = blogsRouter