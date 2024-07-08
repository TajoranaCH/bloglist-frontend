import Togglable from "./Togglable"
import { React } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogsReducer"

const Blog = ({ blog }) => {
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
 return <div className='blog' style={blogStyle}>
    {blog.title} <Togglable buttonLabel='view' cancelLabel='hide'>
      <div>
        { blog.url } <br/>
        { blog.likes } <button onClick={increaseLikes}>like</button><br/>
        { blog.author }<br/>
        {isUserBlog() && <button onClick={deleteB}>delete</button>}
      </div></Togglable>
  </div>  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog