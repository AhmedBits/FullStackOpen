import { useState } from 'react'
import Button from './Button'

const Blog = ({ username, blog, addLike, handleDelete }) => {
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
            label='view'
          />
        </div>
      </div>
      <div style={showWhenExpanded}>
        <div>
          {blog.title} {blog.author}
          <Button
            handleClick={toggleDetails}
            label='hide'
          />
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <Button
            handleClick={() => addLike(blog)}
            label='like'
          />
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={showWhenCreator}>
          <Button
            handleClick={() => handleDelete(blog)}
            label='remove'
          />
        </div>
      </div>
    </div>
  )
}

export default Blog