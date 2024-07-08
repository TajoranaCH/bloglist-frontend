import { createSlice } from '@reduxjs/toolkit'
import { update, setToken, deleteBlogWithId, getAll, createFromObject } from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action)  {
      const newBlog = action.payload
      return [...state, newBlog]
    },
    setBlogs(state, action) {
      return action.payload
    },
    update(state, action) {
      const blog = action.payload
      return state
      .map(b => b.id === blog.id ? { ...blog } : b)
      .sort((a1, a2) => a2.likes - a1.likes)
    },
    delete(state, action) {
      const id = action.payload
      return state
        .filter(b => b.id !== id)
        .sort((a1, a2) => a2.likes - a1.likes)  
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch(blogsSlice.actions.setBlogs(blogs))
  }
}

export const create = blog => {
  return async dispatch => {
    const createdBlog = await createFromObject(blog)
    dispatch(blogsSlice.actions.createBlog(createdBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch(blogsSlice.actions.update(updatedBlog))
  }
}

export const deleteBlog = id => {
    return async dispatch => {
      await deleteBlogWithId(id)
      dispatch(blogsSlice.actions.delete(id))
    }
  }
export default blogsSlice.reducer