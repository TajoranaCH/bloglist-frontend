import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notifyError, setNotifyError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [triggerBlogUpdate, setBlogUpdate] = useState(false)

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
      setBlogs( blogs )
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

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title,
        author,
        url
      })
      setBlogUpdate(true)
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setNotificationMessage('Error creating blog for user.')
      setNotifyError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotifyError(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={handleBlogCreation}>
      <h3>Create new</h3>
    <div>
      title
        <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={url}
        name="URL"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form> 
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} type={notifyError ? 'error' : 'message'}/>

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in <button type="submit" onClick={handleLogout}>logout</button></p>
       {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
     }
     {user && blogForm()} 
      <Footer />
    </div>
  )
}

export default App