import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: "44444",
    author: "444",
    url: "4",
    likes: 0,
    user: {
    username: "japneet",
    name: "japneet singh",
    id: "66619494201d1e737eebdca1"
    },
    id: "6666ee580b0e2757728feef9"
  }
  const { container } = render(<Blog blog={blog} updateBlogs={ () => true }/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    blog.title
  )
  expect(div).toHaveTextContent(
    blog.author
  )
  const sendButton = screen.queryByText(blog.likes)
  const element = screen.queryByText(blog.url)
  expect(element).toBeNull()
  expect(sendButton).toBeNull()
})

test('Views correct information', async () => {
  const blog = {
    title: "44444",
    author: "444",
    url: "4",
    likes: 0,
    user: {
    username: "japneet",
    name: "japneet singh",
    id: "66619494201d1e737eebdca1"
    },
    id: "6666ee580b0e2757728feef9"
  }
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} updateBlogs={ () => true }/>)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    blog.title
  )
  expect(div).toHaveTextContent(
    blog.author
  )
  expect(div).toHaveTextContent(
    blog.url
  )
  expect(div).toHaveTextContent(
    blog.likes
  )
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />) 
  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Insert blog title')
  const authorInput = screen.getByPlaceholderText('Insert blog author')
  const urlInput = screen.getByPlaceholderText('Insert blog url')
  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'title')
  await user.type(urlInput, 'url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})

