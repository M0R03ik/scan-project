import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IHistogramsRequest, IHistogramsResponse } from '../../types'
import { fetchHistograms } from '../../services/searchServices'

interface IInitialState extends IHistogramsResponse {
  isLoading: boolean
}

const initialState: IInitialState = {
  isLoading: false,
  data: [],
}

export const getHistograms = createAsyncThunk(
  'objectsearch/histograms',
  async (req: IHistogramsRequest, { rejectWithValue }) => {
    try {
      const response = await fetchHistograms(req)

      return response.data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const histogramSlice = createSlice({
  name: 'histograms',
  initialState,
  reducers: {
    removeHistograms: state => {
      state.data = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHistograms.pending, state => {
        state.isLoading = true
      })
      .addCase(getHistograms.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data
      })
      .addCase(getHistograms.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { removeHistograms } = histogramSlice.actions

export default histogramSlice.reducer
