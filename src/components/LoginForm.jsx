import PropTypes from 'prop-types'
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../reducers/userReducer';
const LoginForm = ({
   }) => {
   const dispatch = useDispatch()
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');


   return (
     <div>
       <h2>Login</h2>
  
       <form onSubmit={(e) => { e.preventDefault(); dispatch(login(username, password))}  }>
         <div>
           username
           <input
             data-testid='username'
             value={username}
             onChange={(e) => { setUsername(e.target.value) }}
           />
         </div>
         <div>
           password
           <input
             type="password"
             data-testid='password'
             value={password}
             onChange={(e) => { setPassword(e.target.value) }}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
  }

  export default LoginForm