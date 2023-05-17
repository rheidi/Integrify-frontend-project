import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useAppSelector from './hooks/useAppSelector'
import { createUser, fetchAllUsers } from './redux/reducers/usersReducer'
import useAppDispatch from './hooks/useAppDispatch'
import { fetchAllProducts } from './redux/reducers/productsReducer'

const App = () => {
  //const globalState = useSelector(state => state)
  const users = useAppSelector(state => state.usersReducer)
  console.log(users)

  const products = useAppSelector(state => state.productsReducer)
  
  const dispatch = useAppDispatch()

  const addUser = () => {
    dispatch(createUser(
      {
        id: 1234,
        name: 'Heidi',
        avatar: '',
        password: 'Heidi',
        email: 'heidi@mail.com',
        role: 'admin'
      }
    ))
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  return (
    <div>
      {products.map(p => (
        <p key={p.id}>{p.title}</p>
      ))}
      <button onClick={ addUser }>Create new user</button>
    </div>
  )
}

export default App
