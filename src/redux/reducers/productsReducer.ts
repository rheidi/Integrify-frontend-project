import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { Product } from "../../types/Product"
import { NewProduct } from "../../types/NewProduct"
import { ProductUpdate } from "../../types/ProductUpdate"

interface ProductReducer {
  products: Product[]
  product?: Product
  loading: boolean
  error: string
}

const initialState : ProductReducer = {
  products: [],
  loading: false,
  error: '',
}

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async () => {
    try {
      const result = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error
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
      return error
    }
  }
)

export const createNewProduct = createAsyncThunk(
  'createNewProduct',
  async (product: NewProduct) => {
    try {
      const result = await axios.post<Product>('https://api.escuelajs.co/api/v1/products/', product)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error.message
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (id: number) => {
    try {
      const result = await axios.delete<boolean>('https://api.escuelajs.co/api/v1/products/'+ id)
      if (result.data) {
        return id
      }
      return NaN
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (update: ProductUpdate) => {
    try {
      const { id, ...updateObject } = update 
      const result = await axios.put<Product>('https://api.escuelajs.co/api/v1/products/'+ id, updateObject)
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<'priceAsc' | 'priceDesc'>) => {
      if (action.payload === "priceAsc") {
        state.products.sort((a, b) => a.price - b.price)
      } else {
        state.products.sort((a, b) => b.price - a.price)
      }      
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        }
        else {
          state.products = action.payload
        }
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        }
        else {
          state.product = action.payload
        }
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.products.push(action.payload)
        }
        state.loading = false
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else if (!Number.isNaN(action.payload)) {
          state.products = state.products.filter(p => p.id !== action.payload)
        }
        state.loading = false
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const prod = action.payload
          state.products = state.products.map(p => p.id === prod.id ? prod : p)
          state.product = prod
        }
        state.loading = false
      })
  }
})

const  productsReducer = productsSlice.reducer
export const { sortByPrice } = productsSlice.actions
export default productsReducer
