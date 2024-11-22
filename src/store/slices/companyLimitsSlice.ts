import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EventFiltersInfo } from '../../types'
import { fetchUserInfo } from '../../services/userServices'

interface IInitialState extends EventFiltersInfo {
  isLoading: boolean
}

export const getUserInfo = createAsyncThunk(
  'account/info',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserInfo()

      return response.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState: IInitialState = {
  companyLimit: 0,
  usedCompanyCount: 0,
  isLoading: false,
}

const companyLimitsSlice = createSlice({
  name: 'companyLimits',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.companyLimit = action.payload.eventFiltersInfo.companyLimit
        state.usedCompanyCount =
          action.payload.eventFiltersInfo.usedCompanyCount
        state.isLoading = false
      })
      .addCase(getUserInfo.rejected, state => {
        state.isLoading = false
      })
  },
})

export default companyLimitsSlice.reducer
