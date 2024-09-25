const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}