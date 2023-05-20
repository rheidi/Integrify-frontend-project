import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../types/User";
import { UserCredential } from "../../types/UserCredential";

interface UserReducer {
  users: User[]
  currentUser?: User
  loading: boolean
  error: string
  
}

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: ''
}

export const fetchAllUsers = createAsyncThunk(
  'fetchAllUsers',
  async () => {
    try {
      const result = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users')
      return result.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const login = createAsyncThunk(
  'login',
  async ({email, password}: UserCredential) => {
    try {
      const result = await axios.post<{access_token: string}>('https://api.escuelajs.co/api/v1/auth/login', {email, password})
      const authentication = await axios.get<User>('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${result.data.access_token}`
        }
      })
      return authentication.data
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateUserReducer: (state, action: PayloadAction<User[]>) => {
      //return action.payload
    },
    emptyUsersReducer: (state) => {
      state.users = []
    },
    updateOneUser: (state, action) => {
      
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = action.payload
        }
        state.loading = false
    })
    .addCase(fetchAllUsers.pending, (state, action) => {
      state.loading = true
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.error = "Cannot fetch data"
    })
    .addCase(login.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message
      } else {
        state.currentUser = action.payload
      }
      state.loading = false
    })
  }
})

const usersReducer = usersSlice.reducer
export const { createUser, updateUserReducer } = usersSlice.actions
export default usersReducer
