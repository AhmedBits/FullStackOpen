import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blog from '../utils/test_helper'

test('<Blog /> renders title and author, but not url and likes by default', () => {
  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getByText('a title an author')
  const url = screen.queryByText('a url')
  const likes = screen.queryByText('likes 0')

  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('<Blog /> renders url and likes when the view button is clicked', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const url = screen.getByText('a url')
  const likes = screen.getByText('likes 0')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('<Blog /> calls the event handler twice when the like button is clicked twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})