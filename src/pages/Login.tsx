import React, { useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import { login } from '../redux/reducers/usersReducer'

const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({email, password}))
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label id='email'>email:
          <input onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
        </label>
        <br />
        <label id='password'>password:
          <input onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login