import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import cartReducer from "./reducers/cartReducer";

const storedUser = localStorage.getItem('user')

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    cartReducer
  },
  preloadedState: {
    productsReducer: {
      products: [],
      loading: false,
      error: ''
    },
    usersReducer: {
      users: [],
      loading: false,
      error: '',
      currentUser: storedUser ? JSON.parse(storedUser) : undefined
    },
    cartReducer: {
      products: JSON.parse(localStorage.getItem('cart') || '[]' ),
      totalQuantity: parseInt(localStorage.getItem('totalQuantity') || '0')
    }
  }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
