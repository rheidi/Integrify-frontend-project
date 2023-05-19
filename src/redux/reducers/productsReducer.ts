import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { Product } from "../../types/Product"

interface ProductReducer {
  products: Product[]
  product?: Product
}

const initialState : ProductReducer = {
  products: []
}

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async () => {
    try {
      const result = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      return result.data
    } catch (e) {
      const error = e as AxiosError
      if (error.request) {
        console.log('error in request: ', error.request)        
      } else {
        console.log(error.response?.data)
      }
    }
  }
)

export const fetchOneProduct = createAsyncThunk(
  'fetchOneProduct',
  async (id: string | undefined) => {
    try {
      const result = await axios.get<Product>('https://api.escuelajs.co/api/v1/products/'+id)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      if (error.request) {
        console.log('error in request: ', error.request)        
      } else {
        console.log(error.response?.data)
      }
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      //state.push(action.payload)
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload
        }
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.product = action.payload
        }
      })
  }
})

const  productsReducer = productsSlice.reducer
export const { createProduct } = productsSlice.actions
export default productsReducer
