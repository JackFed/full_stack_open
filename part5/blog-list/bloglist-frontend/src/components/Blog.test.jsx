import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  test('Displays title and author only on render', () => {
    const blog = {
      "title": "Test blog name",
      "author": "Guy",
      "url": "12312312",
      "likes": 0,
      "id": "67d721eb3a374811a8bff310",
      "user": {
        "username": "billyo7",
        "name": "Bill",
        "id": "67c88e7f4d3c7a0e5ace32cb"
        },
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Test blog name Guy')

    expect(element).toBeDefined()
  })

  
})