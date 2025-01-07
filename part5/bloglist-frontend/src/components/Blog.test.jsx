import { findByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blog from '../utils/test_helper'

test('<Blog /> renders title and author, but not url and likes by default', () => {
  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getByText('a title an author')
  const urlAndLikes = screen.queryByText('a url 0 likes')
  expect(titleAndAuthor).toBeDefined()
  expect(urlAndLikes).toBeNull()
})

test('<Blog /> renders url and likes when the view button is clicked', () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} />)
})