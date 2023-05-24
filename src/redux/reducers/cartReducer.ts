import { createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/Product"

interface ProductReducer {
  products: Product[]
  product?: Product
  loading: boolean
  error: string
  
}

const initialState : ProductReducer = {
  products: [],
  loading: false,
  error: ''
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {

  }
})

const  cartReducer = cartSlice.reducer
export default cartReducer
