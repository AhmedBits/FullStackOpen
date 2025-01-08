import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} buttonLabel='Create'/>)

  const user = userEvent.setup()
  const title = screen.getByPlaceholderText('Title of the blog')
  const author = screen.getByPlaceholderText('Name of the author')
  const url = screen.getByPlaceholderText('Enter a valid Url')
  const createButton = screen.getByText('Create')

  await user.type(author, 'Oda')
  await user.type(title, 'One Piece')
  await user.type(url, 'https://one-piece.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'One Piece',
    author: 'Oda',
    url: 'https://one-piece.com'
  })
})