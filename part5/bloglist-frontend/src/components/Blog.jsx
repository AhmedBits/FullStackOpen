import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Blog = ({ blog, username, addLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showWhenExpanded = { display : showDetails ? '' : 'none' }
  const hideWhenExpanded = { display : showDetails ? 'none' : '' }

  const showDelete = username === blog.user.username
  const showWhenCreator = { display : showDelete ? '' : 'none' }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blog">
      <div style={hideWhenExpanded}>
        <div>
          {blog.title} {blog.author}
          <Button
            handleClick={toggleDetails}
            label='View'
          />
        </div>
      </div>
      <div style={showWhenExpanded}>
        <div>
          {blog.title} {blog.author}
          <Button
            handleClick={toggleDetails}
            label='Hide'
          />
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <Button
            handleClick={() => addLike(blog)}
            label='Like'
          />
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={showWhenCreator}>
          <Button
            handleClick={() => handleDelete(blog)}
            label='Remove'
          />
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  addLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog