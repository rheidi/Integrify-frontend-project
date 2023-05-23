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

const App = () => {
  const userState = useAppSelector(state => state.usersReducer)
  const {currentUser} = userState
  const PrivateRoutes = ({isAllowed} : {isAllowed: boolean}) => {
  return (
      isAllowed ? <Outlet/> : <Navigate to='login'/>
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
          <Route element={<PrivateRoutes isAllowed={!!currentUser} />}>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route element={<PrivateRoutes isAllowed={!!currentUser && currentUser.role === 'admin'}/>}>
            <Route path='new_product' element={<CreateNewProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
