import React, { useEffect } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllProducts, sortByPrice } from '../redux/reducers/productsReducer'

const Products = () => {

  const productsState = useAppSelector(state => state.productsReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  const setSortProperty = (sortProperty: string) => {
    if (sortProperty === 'none') {
      dispatch(fetchAllProducts())
    } else if (sortProperty === 'priceAsc') {
      dispatch(sortByPrice('priceAsc'))
    } else if (sortProperty === 'priceDesc') {
      dispatch(sortByPrice('priceDesc'))
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="dropdown">
        <label htmlFor='sort'>Sort by: </label>
        <select id='sort' onChange={(event) => setSortProperty(event.target.value)}>
          <option value={'none'}>none</option>
          <option value={'priceAsc'}>Price, ascending</option>
          <option value={'priceDesc'}>Price, descending</option>
        </select>
      </div>
      {productsState.products.map(p => (
        <div key={p.id}>
          <p>{p.title}</p>
          <p>{p.price}</p>
          <a href={'/products/'+p.id}>More information</a>
        </div>
      ))}
    </div>
  )
}

export default Products