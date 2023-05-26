import { logOutUser } from '../redux/reducers/usersReducer'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.usersReducer.currentUser)
  const totalProducts = useAppSelector(state => state.cartReducer.totalQuantity)

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button href="/">Home</Button>
          <Button href="/products">All products</Button>
          {currentUser && currentUser.role === 'admin' && (
            <Button href="/new_product">Create a new product</Button>
          )}
        </Box>
        {currentUser ? (
          <>
            <Typography variant="button">
              {currentUser.name} logged in
            </Typography>
            <Button onClick={() => dispatch(logOutUser())}>Log out</Button>
          </>
        ) : (
          ''
        )}
        {currentUser ? (
          <Button href="/profile">Profile</Button>
        ) : (
          <Button href="/login">Login</Button>
        )}
        <IconButton color="inherit" href="/cart" sx={{ marginLeft: 'auto' }}>
          <Badge badgeContent={totalProducts} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
