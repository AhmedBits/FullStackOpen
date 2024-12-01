import { useState } from "react"

const Togglable = ({
  handleBlogCreation,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  const [formVisible, setFormVisible] = useState(false)

  const showWhenVisible = { display: formVisible ? '' : 'none' }
  const hideWhenVisible = { display: formVisible ? 'none' : '' }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleBlogCreation()
    setFormVisible(false)
  }

  return (
    <div>
      <div style={showWhenVisible}>
        <h2>create new blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
              required
            />
          </div>
          <div>
            url:
            <input
              type="url"
              value={url}
              name="url"
              onChange={handleUrlChange}
              required
            />
          </div>
          <button>create</button>
        </form>
        <button onClick={() => setFormVisible(false)}>
          close
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setFormVisible(true)}>
          new blog
        </button>
      </div>
    </div>
  )
}

export default Togglable