import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import useAppSelector from './hooks/useAppSelector'
import Home from './pages/Home'
import Products from './pages/Products'
import Layout from './pages/Layout'
import Product from './pages/Product'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
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
          <Route path='signup' element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
