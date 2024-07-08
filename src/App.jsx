import { useState, useEffect, useRef, React } from 'react'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { retreiveUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  
  useEffect(() => {
    dispatch(retreiveUser())
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user.name && <LoginForm />}
      {user.name && <div>
       <p>{user.name} logged in <button type="submit" onClick={() => dispatch(logout())}>logout</button></p>
       {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
      </div>
     }
     {user.name && <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>}
      <Footer />
    </div>
  )
}

export default App