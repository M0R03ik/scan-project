import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IDocument, IDocumentsIds, IHistogramsRequest } from '../../types'
import { fetchDocuments, fetchDocumentsId } from '../../services/searchServices'

interface IInitialState extends IDocumentsIds {
  documents: IDocument[]
  isLoading: boolean
}

const initialState: IInitialState = {
  ids: [],
  documents: [],
  isLoading: false,
}

export const getDocumentsId = createAsyncThunk(
  'objectsearch',
  async (req: IHistogramsRequest, { rejectWithValue }) => {
    try {
      const response = await fetchDocumentsId(req)
      const ids = response.data.items.map(item => item.encodedId)
      return ids
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getDocuments = createAsyncThunk(
  'documents',
  async (req: IDocumentsIds, { rejectWithValue }) => {
    try {
      const response = await fetchDocuments(req)
      const docs = response.data.map(item => item.ok)

      return docs
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    removeDocuments: state => {
      state.documents = []
      state.ids = []
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getDocumentsId.fulfilled, (state, action) => {
        state.ids = action.payload
      })
      .addCase(getDocuments.pending, state => {
        state.isLoading = true
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.documents = [...state.documents, ...action.payload]
      })
      .addCase(getDocuments.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { removeDocuments } = documentsSlice.actions

export default documentsSlice.reducer
