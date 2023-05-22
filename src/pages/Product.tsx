import React, { useEffect } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchOneProduct } from '../redux/reducers/productsReducer'
import { useParams } from 'react-router'

const Product = () => {

  const id = useParams().id
  const productState = useAppSelector(state => state.productsReducer)
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOneProduct(id))
  }, [dispatch, id])

  return (
    <div>
      <h1>Product info</h1>
      <p>Name: {productState.product?.title}</p>
      <p>Price: {productState.product?.price}</p>
      <p>Category: {productState.product?.category.name}</p>
      <p>Deascription: {productState.product?.description}</p>
      <img src={productState.product?.images[0]} alt='A product pic' />
    </div>
  )
}

export default Product
