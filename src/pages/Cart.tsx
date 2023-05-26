import React from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { Link } from 'react-router-dom'
import { editQuantity, emptyCart, removeProduct } from '../redux/reducers/cartReducer'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'



const Cart = () => {
  const cart = useAppSelector(state => state.cartReducer.products)
  const dispatch = useAppDispatch()
  let totalSum = 0
  const totalProducts = useAppSelector(state => state.cartReducer.totalQuantity)
  for (const i of cart) {
    totalSum += i.product.price * i.quantity
  }

  const handleSubmit = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = parseInt((e.currentTarget.elements.namedItem('quantity') as HTMLInputElement).value)
    dispatch(editQuantity({id, q}))
  }

  return (
    <Box sx={{p:2}}>
      <Typography variant='h1' gutterBottom>Shopping cart</Typography>
      
      {cart.length === 0 ? (
        <Box>
          <Typography gutterBottom variant='h5'>Cart is still empty</Typography>          
          <Link to={'/products'}>Shop here</Link>
        </Box>
      ) : (
        <Box>
          <Typography variant='h3'>Products in cart:</Typography>
          <Grid container spacing={2} sx={{pt:1}}>
            {cart.map(i => (
              <Grid item key={i.id} minWidth={700}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5">{i.product.title}</Typography>
                    <Typography variant='subtitle2'>Price: {i.product.price}</Typography>
                    <Typography variant='subtitle2'>In cart: {i.quantity}</Typography>
                    <Typography variant='subtitle2'>Total price: {i.product.price * i.quantity}</Typography>
                    <form onSubmit={(e) => handleSubmit(i.id, e)}>
                      <label>Edit quantity</label>
                      <input type='number' min={0} name='quantity' />
                      <input type='submit' value='Update' />
                    </form>
                    <Button onClick={() => dispatch(removeProduct(i.id))}>Remove product from cart</Button>
                  </CardContent>
                </Card>
              </Grid>
              
            ))}
          </Grid>
          <Typography variant='subtitle2'>Sum in total: {totalSum}</Typography>
          <Typography variant='subtitle2'>Total amount of products: {totalProducts}</Typography>
          <Button onClick={(e) => dispatch(emptyCart())}>Empty cart</Button>
        </Box>
        
      )
      }
    </Box>
  )
}

export default Cart