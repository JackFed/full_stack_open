import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";
import { expect } from 'vitest';

test('Making new blog', async () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  const createBlog = vi.fn()

  let { container } = render(< CreateBlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  const submitBtn = container.querySelector('.submit-btn')
  await user.click(submitBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: blog.title,
    author: blog.author,
    url: blog.url
  })
})