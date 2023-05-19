import React, { useEffect } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllProducts } from '../redux/reducers/productsReducer'

const Products = () => {

  const productsState = useAppSelector(state => state.productsReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Products</h1>
      {productsState.products.map(p => (
        <>
          <p key={p.id}>{p.title}</p>
          <a href={'/products/'+p.id}>More information</a>
        </>
      ))}
    </div>
  )
}

export default Products