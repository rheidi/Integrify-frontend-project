import { logOutUser } from "../redux/reducers/usersReducer"
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { SwitchLeft } from "@mui/icons-material"

const Navbar = () => {
    const userState = useAppSelector(state => state.usersReducer)
    const {currentUser} = userState
    const dispatch = useAppDispatch()

    return (
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{ flexGrow: 1}}>
                    <Button href='/'>Home</Button>
                    <Button href='/products'>All products</Button>
                    {currentUser ?
                    <Button href='/profile'>Profile</Button>
                    :
                    <Button href='/login'>Login</Button>
                    }
                    {currentUser && currentUser.role === 'admin' &&
                        <Button href='/new_product'>Create a new product</Button>
                    }
                    {currentUser ?
                        <>
                            <Typography variant="button">Current User: {currentUser.name}</Typography>
                            <Button onClick={() => dispatch(logOutUser())}>Log out</Button>
                        </>
                    : ''}
                    <IconButton color="inherit" href='/cart' sx={{marginLeft: 'auto'}}>
                        <Badge color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
