import { BrowserRouter, Routes, Route } from 'react-router-dom'

import useAppSelector from './hooks/useAppSelector'
import { createUser } from './redux/reducers/usersReducer'
import useAppDispatch from './hooks/useAppDispatch'
import Home from './pages/Home'
import Products from './pages/Products'
import Layout from './pages/Layout'

const App = () => {
  //const globalState = useSelector(state => state)
  const users = useAppSelector(state => state.usersReducer)
  console.log(users)

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
/*     <div>
      <button onClick={ addUser }>Create new user</button>
    </div> */
  )
}

export default App
