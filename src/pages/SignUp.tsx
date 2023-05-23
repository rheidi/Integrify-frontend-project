import React, { useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import { newUser } from '../redux/reducers/usersReducer'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [name, setName] =useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const avatar = 'https://picsum.photos/300'
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(newUser({name, email, password, avatar}))
    navigate('/login')
  }
  return (
    <div>
      <h1>Register new user</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Registration info:</legend>
          <label id='name'>name:
            <input onChange={(e) => setName(e.target.value)} name='name' value={name} />
          </label>
          <br />
          <label id='email'>email:
            <input onChange={(e) => setEmail(e.target.value)} type='email' name='email' value={email} />
          </label>
          <br />
          <label id='password'>password:
            <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} />
          </label>
          <br />
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default SignUp
