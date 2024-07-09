import { useState, useEffect, useRef, React } from 'react'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { retreiveUser, logout } from './reducers/userReducer'
import { getAll } from './services/users'
import { setToken } from './services/blogs'
import { Routes, Route, useMatch, Link
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [allUsers, setAllUsers] = useState([])
  console.log(allUsers)
  useEffect(() => {
    dispatch(retreiveUser())
    dispatch(initializeBlogs())
    getAll()
      .then(us => setAllUsers(us))
  }, [])

  if (user.token) {
    setToken(user.token)
  }

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const Login = () => <>
      <h1>Blogs</h1>
      <Notification />
        <LoginForm />
      </>

  const Blogs = () => <>
        {user.name && blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
        {user.name && <Togglable buttonLabel='new blog'>
          <BlogForm />
        </Togglable>} 
  </>

  const urlUser = matchUser
    ? allUsers.find(u => u.id === matchUser.params.id)
    : null
  const urlBlog = matchBlog ? blogs.find(b => b.id === matchBlog.params.id) : null
  const padding = {
    padding: 5
  }
  if (!user.name) return <Login />
  return (
    <div>
      <nav style={ { backgroundColor: '#e9e9e9', padding: 5, fontSize: '1.23em' } }>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
        {user.name} logged in <button type="submit" onClick={() => dispatch(logout())}>logout</button>
      </nav>
      <h1>Blogs</h1>
      <Notification />
      <Routes>
      <Route path='/' element={<Blogs />} />
      <Route path="/users" element={<Users users={allUsers} />} />
      <Route path="/users/:id" element={<User user={urlUser} />} />
      <Route path="/blogs/:id" element={<Blog blog={urlBlog} isFullView={true} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App