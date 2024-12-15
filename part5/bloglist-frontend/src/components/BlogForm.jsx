import { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'

const BlogForm = ({ createBlog, buttonLabel }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    await createBlog({
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
        <InputField
          text='Title: '
          type='text'
          name='title'
          value={title}
          handleChange={event => setTitle(event.target.value)}
        />
        <InputField
          text='Author: '
          type='text'
          name='author'
          value={author}
          handleChange={event => setAuthor(event.target.value)}
        />
        <InputField
          text='Url: '
          type='text'
          name='url'
          value={url}
          handleChange={event => setUrl(event.target.value)}
        />
        <Button
          label={buttonLabel}
        />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

export default BlogForm