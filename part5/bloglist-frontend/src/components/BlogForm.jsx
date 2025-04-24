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
    <div className='blog-form'>
      <h2>Create a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          placeholder='Title of the blog'
          type='text'
          name='title'
          value={title}
          handleChange={event => setTitle(event.target.value)}
          id='title'
          dataTestId='title'
        />
        <InputField
          placeholder='Name of the author'
          type='text'
          name='author'
          value={author}
          handleChange={event => setAuthor(event.target.value)}
          id='author'
          dataTestId='author'
        />
        <InputField
          placeholder='Enter a valid Url'
          type='url'
          name='url'
          value={url}
          handleChange={event => setUrl(event.target.value)}
          id='url'
          dataTestId='url'
        />
        <Button className='button button--green'
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