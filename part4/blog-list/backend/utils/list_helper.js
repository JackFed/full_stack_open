const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const totalBlogs = blogs.reduce((authors, blog) => {
    const existingAuthor = _.find(authors, { author: blog.author })

    if (existingAuthor) {
      existingAuthor.blogs += 1 
    } else {
      authors.push({ author: blog.author, blogs: 1 })
    }
    return authors
  }, [])
  
  return _.maxBy(totalBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const groupByAuthor = _.groupBy(blogs, 'author')
  const totalLikesByAuthor = _.mapValues(groupByAuthor, (blogs) => _.sumBy(blogs, 'likes'))

  const likesArray = _.toPairs(totalLikesByAuthor)
  const mostLikedAuthor = _.maxBy(likesArray, ([,likes]) => likes)

  return { author: mostLikedAuthor[0], likes: mostLikedAuthor[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}