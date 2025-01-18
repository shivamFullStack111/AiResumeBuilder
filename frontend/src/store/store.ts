import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector } from 'react-redux'
import resumeReducer from './slices/resumeSlice'

const store = configureStore({
  reducer:{
    resume:resumeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()




export default store