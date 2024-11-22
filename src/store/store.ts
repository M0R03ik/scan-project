import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import companyLimits from './slices/companyLimitsSlice'
import histograms from './slices/histogramSlice'
import documents from './slices/documentsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user: userSlice,
    companyLimits: companyLimits,
    histograms: histograms,
    documents: documents,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<RootDispatch>()
