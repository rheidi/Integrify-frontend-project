import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Box, Typography } from '@mui/material'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchOneProduct } from '../redux/reducers/productsReducer'

const Product = () => {

  const id = useParams().id
  const productState = useAppSelector(state => state.productsReducer)
  const dispatch = useAppDispatch() 
  
  useEffect(() => {
    dispatch(fetchOneProduct(id))
  }, [dispatch, id])

  return (
    <Box sx={{p: 2}}>
      <Typography variant='h1'>Product info</Typography>
      <Typography variant='h3'>{productState.product?.title}</Typography>
      <Typography variant='subtitle2'>Price: {productState.product?.price}</Typography>
      <Typography variant='body2'>From category {productState.product?.category.name}</Typography>
      <Typography variant='body1'>Description: {productState.product?.description}</Typography>
      <img src={productState.product?.images[0]} width={200} alt='A product pic' />
    </Box>
  )
}

export default Product
