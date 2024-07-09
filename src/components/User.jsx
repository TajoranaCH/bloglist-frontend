
const Users = ({ user }) =>{
    if (!user) return
    return     <>
    <h2>{user.name}</h2>
    <h3>Added Blogs</h3>
    <ul>
      {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
    </ul>
  </>
}


export default Users