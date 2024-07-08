import { React, useState } from 'react'
import { useDispatch } from "react-redux"
import { create } from '../reducers/blogsReducer'
const blogForm = () => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')
    const dispatch = useDispatch()

    return <div>
    <form onSubmit={(e) => { e.preventDefault(); dispatch(create({ title, author, url })); setTitle(''); setAuthor(''); setUrl('') }}>
      <h3>Create a new Blog</h3><div>
            title
            <input
                type="text"
                value={title}
                name="Title"
                placeholder="Insert blog title"
                onChange={({ target }) => setTitle(target.value)} />
        </div><div>
                author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    placeholder="Insert blog author"
                    onChange={({ target }) => setAuthor(target.value)} />
            </div><div>
                url
                <input
                    type="text"
                    value={url}
                    name="URL"
                    placeholder="Insert blog url"
                    onChange={({ target }) => setUrl(target.value)} />
            </div><button type="submit">save</button></form>
            </div>
}
  export default blogForm
