const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => {
    return likes + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const  mostLiked = blogs.reduce((max, blog) => 
    (blog.likes >= max.likes ? blog : max), blogs[0])

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}