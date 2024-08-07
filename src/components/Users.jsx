import {
  Link
} from "react-router-dom"

const Users = ({ users }) => 
    <>
      <h2>Users</h2>
      <table>
      <tbody>
      <tr>
      <th>
      </th>
      <th>
        Blogs Created
      </th>
      </tr>
      {users.map(user =>
          <tr key={user.id}>
            <td>
            <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </>

export default Users