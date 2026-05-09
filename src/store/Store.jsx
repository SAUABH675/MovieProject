import { configureStore } from '@reduxjs/toolkit'

import tvReducer from './reducers/TvSlice'
import movieReducer from './reducers/MovieSlice'
import personReducer from './reducers/PeopleSlice'

const Store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})
export default Store;
