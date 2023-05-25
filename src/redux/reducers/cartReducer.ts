import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/Product"
import { CartItem } from "../../types/CartItem"

interface ProductReducer {
  products: CartItem[]
}

const initialState : ProductReducer = {
  products: [],
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    emptyCart: (state) => {
      window.localStorage.removeItem('cart')
      return initialState
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProd = action.payload
      const existingProduct = state.products.find(i => i.id === newProd.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        const id = newProd.id
        const quantity = 1
        const product = newProd
        state.products.push({id, quantity, product})
      }
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id != action.payload)
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
    editQuantity: (state, action: PayloadAction<{id: number, q: number}>) => {
      state.products = state.products.map(i => {
        return i.id === action.payload.id ? (
          {...i, quantity: action.payload.q}
        ) : (
          i
        )
      })
      window.localStorage.setItem('cart', JSON.stringify(state.products))
    }
  }
})

const  cartReducer = cartSlice.reducer
export const { addProduct, emptyCart, removeProduct, editQuantity } = cartSlice.actions
export default cartReducer
