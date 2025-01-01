import { render, screen } from '@testing-library/react'
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

  const { container } = render(<Blog blog={blog} />)

  const defaultView = container.querySelector('.defaultView')
  expect(defaultView).toHaveTextContent('a title an author')
  expect(defaultView).not.toHaveTextContent('a url 0')
})