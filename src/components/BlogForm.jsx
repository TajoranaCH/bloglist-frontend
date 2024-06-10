import { React, useState } from 'react'

const blogForm = ({ createBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')
    
    return <div>
    <form onSubmit={(event) => createBlog(event, title, author, url)}>
      <h3>Create a new Blog</h3><div>
            title
            <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)} />
        </div><div>
                author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)} />
            </div><div>
                url
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)} />
            </div><button type="submit">save</button></form>
            </div>
}
  export default blogForm
