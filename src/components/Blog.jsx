import Togglable from "./Togglable"
import blogService from './../services/blogs'
import { React, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [updateBlog, setUpdateBlog] = useState(false)
  const increaseLikes = async () => {
    try {
      await blogService.update(blog.id, { likes: blog.likes + 1 })
      blog.likes += 1
      setUpdateBlog(!updateBlog)
    } catch(e) {
      console.log(e)
    }
  }

  const isUserBlog = () => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    return (loggedUserJSON && loggedUserJSON.username === blog.user.username)
  }
  const deleteBlog = async () => {
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      updateBlogs()
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
        {isUserBlog() && <button onClick={deleteBlog}>delete</button>}
      </div></Togglable>
  </div>  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default Blog