import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../features/moviesSlice'
import filterReducer from '../features/filterSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    movies: movieReducer, 
    filter: filterReducer,
    user: userReducer
  }
})