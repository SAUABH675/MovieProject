import { configureStore } from '@reduxjs/toolkit'

import tvReducer     from './reducers/TvSlice'
import movieReducer  from './reducers/MovieSlice'
import personReducer from './reducers/PeopleSlice'
import authReducer   from './reducers/authSlice'         // local host

const Store = configureStore({
  reducer: {
    movie:  movieReducer,
    tv:     tvReducer,
    person: personReducer,
    auth:   authReducer,                        // local host
  },
})

export default Store;
