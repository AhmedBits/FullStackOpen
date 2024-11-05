const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user' , {
    username: 1,
    name: 1
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ 
      error: 'Invalid token'
    })
  }
  const newBlog = request.body

  if (!('title' in newBlog && 'url' in newBlog)) {
    return response.status(400).json({
      error: 'Missing title/url'
    })
  }

  const user = await User.findById(decodedToken.id)
  newBlog.user = user.id

  const blogToSave = 'likes' in newBlog
    ? new Blog(newBlog) : new Blog({...newBlog, likes: 0})

  const savedBlog = await blogToSave.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({
      error: 'Nonexistent Blog'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  const requestedUser = await User.findById(decodedToken.id)
  if (blogToDelete.user.toString() !== requestedUser.id) {
    return response.status(401).json({
      error: 'Action limited to blog creator'
    })
  }

  await Blog.findByIdAndDelete(blogToDelete.id)
  response.status(204).end()
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