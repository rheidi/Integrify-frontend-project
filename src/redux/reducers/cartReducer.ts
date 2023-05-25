import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/Product"

interface ProductReducer {
  products: Product[]
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
    emptyCart: (state) => {
      return initialState
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    }
  }
})

const  cartReducer = cartSlice.reducer
export const { addProduct } = cartSlice.actions
export default cartReducer
