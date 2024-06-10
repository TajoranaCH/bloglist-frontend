import { useState, useEffect, useRef, React } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notifyError, setNotifyError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [triggerBlogUpdate, setBlogUpdate] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => {
        if (a.likes > b.likes) return -1
        if (a.likes === b.likes) return 0
        return 1
      }) )
      setBlogUpdate(false)
    }
    )  
  }, [triggerBlogUpdate])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong credentials')
      setNotifyError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotifyError(false)
      }, 5000)
    }
  }

  const createBlog = async (event, title, author, url) => {
    event.preventDefault()
    try {
      await blogService.create({
        title,
        author,
        url
      })
      blogFormRef.current.toggleVisibility()
      setBlogUpdate(true)
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('Error creating blog for user.')
      setNotifyError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotifyError(false)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Error proceeding logout')
      setNotifyError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotifyError(false)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} type={notifyError ? 'error' : 'message'}/>
      {!user && <LoginForm handleSubmit={handleLogin} handleUsernameChange={(event) => setUsername(event.target.value)} handlePasswordChange={(event) => setPassword(event.target.value)} username={username} password={password}/>}
      {user && <div>
       <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
       {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={() => setBlogUpdate(true)}/>
      )}
      </div>
     }
     {user && <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>}
      <Footer />
    </div>
  )
}

export default App