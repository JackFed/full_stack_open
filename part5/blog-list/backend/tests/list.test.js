const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithNoBlogs = []

const listWithOneBlog = [
  {
    "_id": "67c098e429b49fd267ed0751",
    "title": "Missing Semester MIT",
    "author": "MIT",
    "url": "https://missing.csail.mit.edu/",
    "likes": 5,
    "__v": 0
  }
]

const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
// Same amout of blogs posted and total likes
const sameAmountBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(listWithNoBlogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has no blog, equals 0', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('list with many blogs equals sum of their likes', () => {
    assert.strictEqual(listHelper.totalLikes(manyBlogs), 36)
  })
})

describe('Favorite blog', () => {
  test('list with no blogs', (listHelper.favoriteBlog([]), null))

  test('list with one blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      "title": "Missing Semester MIT",
      "author": "MIT",
      "likes": 5
    })
  })
  
  test('list with many blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(manyBlogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  test('list with many blogs two authors with equal most liked', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(sameAmountBlogs), { 
      title: 'Type wars', 
      author: 'Robert C. Martin', 
      likes: 5 
    })
  })
})

describe('author with most blog posts', () => {
  test('list with no blogs', (listHelper.mostBlogs([]), null))

  test('list with one blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      "author": "MIT",
      "blogs": 1
    })
  })

  test('list with many blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(manyBlogs), {
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('list with many blogs two authors with equal total posts', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(sameAmountBlogs), {
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })
})

describe('author with most total likes', () => {
  test('list with no blogs', (listHelper.mostLikes([]), null))

  test('list with one blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      "author": "MIT",
      "likes": 5
    })
  })

  test('list with many blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(manyBlogs), {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('list with many blogs two authors with equal total posts', () => {
    assert.deepStrictEqual(listHelper.mostLikes(sameAmountBlogs), {
      author: "Edsger W. Dijkstra",
      likes: 7
    })
  })
})