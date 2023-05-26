import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'

import useAppSelector from './hooks/useAppSelector'
import Home from './pages/Home'
import Products from './pages/Products'
import Layout from './pages/Layout'
import Product from './pages/Product'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import CreateNewProduct from './pages/CreateNewProduct'
import EditProduct from './pages/EditProduct'
import Cart from './pages/Cart'
import { ThemeProvider } from '@emotion/react'
import darkTheme from './styling/darkTheme'
import { CssBaseline } from '@mui/material'

const App = () => {
  const userState = useAppSelector(state => state.usersReducer)
  const {currentUser} = userState
  const PrivateRoutes = ({isAllowed} : {isAllowed: boolean}) => {
  return (
      isAllowed ? <Outlet/> : <Navigate to='login'/>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<Product />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='cart' element={<Cart />} />
            <Route element={<PrivateRoutes isAllowed={!!currentUser} />}>
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route element={<PrivateRoutes isAllowed={!!currentUser && currentUser.role === 'admin'}/>}>
              <Route path='new_product' element={<CreateNewProduct />} />
              <Route path='edit_product/:id' element={<EditProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
