import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMovies: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
