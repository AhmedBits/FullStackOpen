import { findByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> renders title and author, but not url and likes by default', () => {
  const blog = {
    title: 'a title',
    author: 'an author',
    url: 'a url',
    likes: 0,
    user: {
      username: 'coolkid'
    }
  }

  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getByText('a title an author')
  const urlAndLikes = screen.queryByText('a url 0 likes')
  expect(titleAndAuthor).toBeDefined()
  expect(urlAndLikes).toBeNull()
})