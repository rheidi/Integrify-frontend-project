import React, { useEffect } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchOneProduct } from '../redux/reducers/productsReducer'
import { useParams } from 'react-router'

const Product = () => {

  const id = useParams().id
  const productState = useAppSelector(state => state.productsReducer)
  console.log(productState);
  

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOneProduct(id))
  }, [dispatch, id])

  return (
    <div>
      <h1>Product info</h1>
      <p>{productState.product?.title}</p>
      <p>{productState.product?.price}</p>
      <p>{productState.product?.category.name}</p>
      <p>{productState.product?.description}</p>
    </div>
  )
}

export default Product
