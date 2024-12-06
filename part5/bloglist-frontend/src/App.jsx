import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import InputField from './components/InputField'
import Button from './components/Button'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Clears notifications
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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'Invalid Username/Password',
        type: 'error'
      })
    }
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
      const {title, author} = blogObject
      
      setNotification({
        message: `a new blog "${title}" by ${author} is added`,
        type: 'success'
      })
      
      // Update blogs
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setNotification({
        message: 'Failed to add blog - try logging in again',
        type: 'error'
      })
    }
  }

  const handleLike = async blog => {
    try {
      const updatedBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      
      await blogService.update(
        blog.id,
        updatedBlog
      )

      setNotification({
        message: `Liked "${updatedBlog.title}"`,
        type: 'success'
      })

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setNotification({
        message: 'Failed to like blog',
        type: 'error'
      })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.message}
          type={notification.type}
        />
        <form onSubmit={handleLogin}>
          <InputField
            text='Username: '
            type="text"
            value={username}
            name="Username"
            autoComplete="off"
            handleChange={({ target }) => setUsername(target.value)}
            required
          />
          <InputField
            text='Password: '
            type="password"
            value={password}
            name="Password"
            handleChange={({ target }) => setPassword(target.value)}
            required
          />
          <Button
            label='Login'
          />
        </form>
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
      <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
        <BlogForm
          createBlog={handleBlogCreation}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          addLike={handleLike}
        />
      )}
    </div>
  )
}

export default App