import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User";

const initialState : Product[] = []

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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    }
  },
  extraReducers: (build) => {
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload
      }
    })
  }
})

const  productsReducer = productsSlice.reducer
export const { createProduct } = productsSlice.actions
export default productsReducer
