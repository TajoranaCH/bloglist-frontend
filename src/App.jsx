import { useState, useEffect, useRef, React } from 'react'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setToken } from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => { return blogs })
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 4, true))
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Error proceeding logout.', 4, true))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && <LoginForm handleSubmit={handleLogin} handleUsernameChange={(event) => setUsername(event.target.value)} handlePasswordChange={(event) => setPassword(event.target.value)} username={username} password={password}/>}
      {user && <div>
       <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
       {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
      </div>
     }
     {user && <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>}
      <Footer />
    </div>
  )
}

export default App