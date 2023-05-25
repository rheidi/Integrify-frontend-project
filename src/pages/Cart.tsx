import React from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { Link } from 'react-router-dom'



const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.products)
  const dispatch = useAppDispatch()


  return (
    <div>
      <h1>Shopping cart</h1>
      
      {cart.length === 0 ? (
        <div>
          <h2>Cart is empty</h2>          
          <Link to={'/products'}>Shop here</Link>
        </div>
      ) : (
        <div>
          <h2>Products in cart</h2>
          {cart.map(p => (
            <div key={p.id}>
              <p>{p.title}</p>
            </div>
          ))}
        </div>
        
      )
      }
    </div>
  )
}

export default Cart