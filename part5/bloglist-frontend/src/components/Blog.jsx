import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showWhenExpanded = { display : showDetails ? '' : 'none' }
  const hideWhenExpanded = { display : showDetails ? 'none' : '' }

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
            label='like'
          />
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog