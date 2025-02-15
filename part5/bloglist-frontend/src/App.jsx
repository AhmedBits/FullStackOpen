import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Button from './components/Button'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [updateBlogs, setUpdateBlogs] = useState(false)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs =  await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setUpdateBlogs(false)
    }
    fetchBlogs()
  }, [updateBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => {
        setNotification({
          message: null,
          type: null
        })
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [notification])

  const blogFormRef = useRef()

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setNotification({
        message: 'Invalid Username/Password',
        type: 'error'
      })
    }
  }

  const handleRegister = async (username, password, confirmPassword, name) => {

  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogCreation = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const { title, author } = blogObject

      setNotification({
        message: `a new blog "${title}" by ${author} is added`,
        type: 'success'
      })

      setUpdateBlogs(true)
    } catch (exception) {
      setNotification({
        message: 'Failed to add blog - try logging in again',
        type: 'error'
      })
    }
  }

  const handleLike = async blog => {
    try {
      const { id, likedBy, user, author, title, url, likes } = blog
      const isLiked = likedBy.includes(user.username)

      const updatedBlog = {
        user: user.id,
        author,
        title,
        url,
        likes: isLiked ? likes - 1 : likes + 1,
        likedBy: isLiked
          ? likedBy.filter(like => like !== user.username)
          : likedBy.concat(user.username)
      }

      await blogService.update(id, updatedBlog)

      const message = isLiked
        ? `Unliked "${title}"`
        : `Liked "${title}"`

      setNotification({
        message,
        type: 'success'
      })

      setUpdateBlogs(true)
    } catch (exception) {
      setNotification({
        message: 'Failed to like blog',
        type: 'error'
      })
    }
  }

  const handleDelete = async blog => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.deleteblog(blog.id)
        setNotification({
          message: 'Blog deleted',
          type: 'success'
        })

        setUpdateBlogs(true)
      } catch (exception) {
        setNotification({
          message: 'Failed to delete blog',
          type: 'error'
        })
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification.message}
          type={notification.type}
        />
        <LoginForm
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />
      <div>
        {user.name} logged in
        <Button
          handleClick={handleLogout}
          label='Logout'
        />
      </div>
      <br></br>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={handleBlogCreation}
          buttonLabel='Create'
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          addLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App