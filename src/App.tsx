import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import useAppSelector from './hooks/useAppSelector'
import { createUser } from './redux/reducers/usersReducer'
import useAppDispatch from './hooks/useAppDispatch'
import Home from './pages/Home'
import Products from './pages/Products'
import Layout from './pages/Layout'
import Product from './pages/Product'
import Profile from './pages/Profile'
import Login from './pages/Login'

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

  const PrivateRoutes = () => {
    const userState = useAppSelector(state => state.usersReducer)
    const {currentUser} = userState
  
  return (
      currentUser ? <Outlet/> : <Navigate to='login'/>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
/*     <div>
      <button onClick={ addUser }>Create new user</button>
    </div> */
  )
}

export default App
