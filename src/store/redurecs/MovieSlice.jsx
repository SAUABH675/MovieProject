<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

    loadmovie:(state,action)=>{
        state.info=action.payload;
    },
    removemovie:(state,action)=>{
        state.info=null;
    },
  },
})

// Action creators are generated for each case reducer function

export const { loadmovie, removemovie } = movieSlice.actions;
export default movieSlice.reducer;
=======
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

    loadmovie:(state,action)=>{
        state.info=action.payload;
    },
    removemovie:(state,action)=>{
        state.info=null;
    },
  },
})

// Action creators are generated for each case reducer function

export const { loadmovie, removemovie } = movieSlice.actions;
export default movieSlice.reducer;
>>>>>>> parent of 55ec2d9 (Project update)
