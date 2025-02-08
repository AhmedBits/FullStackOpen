import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Blog = ({ blog, username, addLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('View')

  const showDelete = username === blog.user.username
  const showWhenCreator = { display : showDelete ? '' : 'none' }
  const isLikedByUser = blog.likedBy.includes(username)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
    setButtonLabel(showDetails ? 'View' : 'Hide')
  }

  return (
    <div className="blog">
      <div>
        <div>
          {blog.title} {blog.author}
          <Button
            handleClick={toggleDetails}
            label={buttonLabel}
          />
        </div>
      </div>
      {showDetails && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <Button
              handleClick={() => addLike(blog)}
              label={isLikedByUser ? 'Unlike' : 'Like'}
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
      )}
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