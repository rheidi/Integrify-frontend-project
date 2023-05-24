import React, { useEffect, useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { deleteProduct, fetchAllProducts, sortByPrice } from '../redux/reducers/productsReducer'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'

const getFilteredList = (products: Product[], search: string) => {
  return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
}

const Products = () => {
  const {products} = useAppSelector(state => state.productsReducer)
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 1000)
    return () => clearTimeout(timer)
  }, [search])
  const filterProducts = getFilteredList(products, debouncedSearch)

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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const userState = useAppSelector(state => state.usersReducer)
    const {currentUser} = userState

  return (
    <div>
      <h1>Products</h1>
      <div className='dropdownSort'>
        <label htmlFor='sort'>Sort by: </label>
        <select id='sort' onChange={(event) => setSortProperty(event.target.value)}>
          <option value={'none'}>none</option>
          <option value={'priceAsc'}>Price, ascending</option>
          <option value={'priceDesc'}>Price, descending</option>
        </select>
      </div>
      <div>
      <label htmlFor='search'>Search for a product: </label>
        <input 
          type='text'
          name='search'
          id='search'
          value={search}
          onChange={onSearchChange}
        />
      </div>
      {filterProducts.map(p => (
        <div key={p.id}>
          <p>Product name: {p.title}</p>
          <p>Product price: {p.price}</p>
          <Link to={'/products/'+p.id}>More information</Link>
          <br />
          {currentUser && currentUser.role === 'admin' &&
            <div>
              <button onClick={() => dispatch(deleteProduct(p.id))}>Delete product</button>
              <Link to={'/edit_product/'+p.id}>Edit product</Link>
            </div>
          }
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Products
