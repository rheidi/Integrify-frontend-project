import React, { useEffect, useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchAllProducts, sortByPrice } from '../redux/reducers/productsReducer'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'
import { addProduct } from '../redux/reducers/cartReducer'
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'

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

  const setSortProperty = (event: SelectChangeEvent) => {
    if (event.target.value === 'none') {
      dispatch(fetchAllProducts())
    } else if (event.target.value === 'priceAsc') {
      dispatch(sortByPrice('priceAsc'))
    } else if (event.target.value === 'priceDesc') {
      dispatch(sortByPrice('priceDesc'))
    }
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const userState = useAppSelector(state => state.usersReducer)
  const {currentUser} = userState

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h1' gutterBottom >Products</Typography>
      <Box className='dropdownSort' sx={{p:1}}>
        <FormControl sx={{minWidth: 233}}>
        <InputLabel id='sort'>Sort</InputLabel>
        <Select id='sort' value='none' label='Sort' onChange={setSortProperty}>
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'priceAsc'}>Price, ascending</MenuItem>
          <MenuItem value={'priceDesc'}>Price, descending</MenuItem>
        </Select>
        </FormControl>
      </Box>
      <Box>
      <TextField
        sx={{p:1, minWidth: 250}}
        type='text'
        label='Search'
        id='search'
        value={search}
        onChange={onSearchChange}
      />
      </Box>
      <Grid container spacing={2} sx={{pt:1}}>
      {filterProducts.map(p => (
        <Grid item key={p.id}>
          <Card sx={{ width: 300}}>
            <CardContent>
              <Typography gutterBottom variant="h5">{p.title}</Typography>
              <Typography>price: {p.price}</Typography>
              <Button onClick={(e) => dispatch(addProduct(p))}>Add to cart</Button>
              <br />
              <Link to={'/products/'+p.id}>More information</Link>
              {currentUser && currentUser.role === 'admin' &&
                <Link to={'/edit_product/'+p.id}>Edit/delete product</Link>
              }
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}

export default Products
