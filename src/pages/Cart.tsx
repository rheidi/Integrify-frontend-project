import React from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { Link } from 'react-router-dom'
import { emptyCart, removeProduct } from '../redux/reducers/cartReducer'



const Cart = () => {
  const cart = useAppSelector(state => state.cartReducer.products)
  const dispatch = useAppDispatch()
  let totalSum = 0
  let totalProducts = 0
  for (const i of cart) {
    totalSum += i.product.price * i.quantity
    totalProducts += i.quantity
  }

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
          {cart.map(i => (
            <div key={i.id}>
              <p>{i.product.title}</p>
              <p>{i.product.price}</p>
              <p>{i.quantity}</p>
              <button onClick={() => dispatch(removeProduct(i.id))}>Remove product from cart</button>
            </div>
          ))}
          <p>Total sum: {totalSum}</p>
          <p>Total amount of products: {totalProducts}</p>
          <button onClick={(e) => dispatch(emptyCart())}>Empty cart</button>
        </div>
        
      )
      }
    </div>
  )
}

export default Cart