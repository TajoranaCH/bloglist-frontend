import Togglable from "./Togglable"
import { React } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogsReducer"
import { Link } from "react-router-dom"
const Blog = ({ blog, isFullView = false }) => {
  console.log(blog)
  if (!blog) return

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const increaseLikes = () => {
    try {
      console.log(blog)
      dispatch(likeBlog(blog))
    } catch(e) {
      console.log(e)
    }
  }

  const isUserBlog = () => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    return (loggedUserJSON && loggedUserJSON.username === blog.user.username)
  }
  const deleteB = async () => {
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      }
    } catch(e) {
      console.log(e)
    }
  }
  if (!isFullView) {
    return <div className='blog' style={blogStyle}>
    <Link to={'/blogs/' + blog.id}>{blog.title}</Link>
  </div>
  } 
  return <div>
    <h3>{blog.title}</h3>
    <a href={blog.url} target="blank">{blog.url}</a>
    <p>{blog.likes} like{blog.likes === 1 ? '' : 's'} <button onClick={increaseLikes}>like</button></p>
    <p>added by {blog.author} {isUserBlog() && <button onClick={deleteB}>delete</button>}
    </p>
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog