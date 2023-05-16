import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer
  }
})

export type GlobalState = ReturnType<typeof store.getState>

export default store
