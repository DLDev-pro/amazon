// import { configureStore } from '@reduxjs/toolkit'
// import RootReducer from 'redux/rootReducer'

// export default configureStore({
//   reducer: RootReducer,
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
//   enhancers: [],
// })

import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import RootReducer from '../rootReducer'

const store = configureStore({
  reducer: RootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  enhancers: [],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
