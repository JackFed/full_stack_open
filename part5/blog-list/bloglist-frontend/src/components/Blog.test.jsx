import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 0,
      id: "67d721eb3a374811a8bff310",
      user: {
        username: "billyo7",
        name: "Bill",
        id: "67c88e7f4d3c7a0e5ace32cb"
      },
    }
  })
  test('Displays title and author only on render', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)

    expect(element).toBeDefined()
  })

  test('Displays url and likes when view button clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)


    const likes = screen.getByText(`likes: ${blog.likes}`)
    const url = screen.getByText(blog.url)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('Displays url and likes when view button clicked', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})