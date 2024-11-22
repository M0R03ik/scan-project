import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAuthRequisites, IAuthResponse, IError } from '../../types'
import { fetchAuth } from '../../services/userServices'

type TInitialState = {
  accessToken: string | null
  expire: string | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

const initialState: TInitialState = {
  accessToken: null,
  expire: null,
  isAuth: false,
  isLoading: false,
  error: null,
}

export const loginUser = createAsyncThunk<
  IAuthResponse, // Успешный результат
  IAuthRequisites, // Аргумент запроса
  { rejectValue: IError } // Конфигурация reject
>('auth', async (req, { rejectWithValue }) => {
  try {
    const response = await fetchAuth(req)

    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('expire', response.data.expire)
    localStorage.setItem('isAuth', 'true')

    return {
      accessToken: response.data.accessToken,
      expire: response.data.expire,
    }
  } catch (error) {
    let err = error as IError
    if (err.message) {
      return rejectWithValue(err)
    } else {
      return rejectWithValue({ message: 'Unknown error' })
    }
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.expire = action.payload.expire
      state.isAuth = true
    },
    removeUser: state => {
      state.accessToken = null
      state.expire = null
      state.isAuth = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expire')
      localStorage.removeItem('isAuth')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuth = true
        state.accessToken = action.payload.accessToken
        state.expire = action.payload.expire
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message
      })
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
