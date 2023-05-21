import { Link } from "react-router-dom"
import useAppSelector from "../hooks/useAppSelector"

function Navbar() {
    const userState = useAppSelector(state => state.usersReducer)
    const {currentUser} = userState

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                <Link to='/profile'>User Page</Link>
                </li>
            </ul>
            {currentUser ? <p>Current User: {currentUser.name}</p> : ''}
        </nav>
    )
}

export default Navbar
