import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: User[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  }
})

const usersReducer = usersSlice.reducer
export default usersReducer
