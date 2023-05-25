import { Link } from "react-router-dom"

import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { logOutUser } from "../redux/reducers/usersReducer"

function Navbar() {
    const userState = useAppSelector(state => state.usersReducer)
    const {currentUser} = userState
    const dispatch = useAppDispatch()

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/products'>Products</Link>
                </li>
                <li>
                    <Link to='cart'>Shopping cart</Link>
                </li>
                {currentUser ?
                    <li><Link to='/profile'>User Page</Link></li>
                    :
                    <li><Link to='/login'>Login</Link></li>
                }
                {currentUser && currentUser.role === 'admin' &&
                    <li><Link to='/new_product'>Create a new product</Link></li>
                }                
            </ul>
            {currentUser ?
            <div>
                <p>Current User: {currentUser.name}</p>
                <button onClick={() => dispatch(logOutUser())}>Log out</button>
            </div>
            : ''}
        </nav>
    )
}

export default Navbar
