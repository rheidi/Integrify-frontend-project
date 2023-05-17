import React, { useEffect } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllProducts } from '../redux/reducers/productsReducer'

const Products = () => {

  const products = useAppSelector(state => state.productsReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {products.map(p => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  )
}

export default Products