import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
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

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogCreation = async () => {
    try {
      const newBlog = {
        title,
        author,
        url
      }
      await blogService.create(newBlog)
      
      setNotification({
        message: `a new blog "${title}" by ${author} is added`,
        type: 'success'
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notification.message}
          type={notification.type}
        />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              autoComplete="off"
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button>login</button>
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
        <button onClick={handleLogout}>logout</button>
      </div>
      <br></br>
      <Togglable
        handleBlogCreation={handleBlogCreation}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        title={title}
        author={author}
        url={url}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App