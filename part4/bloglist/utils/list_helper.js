const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLiked = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === mostLiked)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}