import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
            required
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
            required
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm