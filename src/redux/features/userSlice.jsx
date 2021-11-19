import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  }
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.value = action.payload;
		},

		logoutUser: (state, action) => {
			state.value = initialState.value;
		},

		addToFavorites: (state, action) => {
      state.value.FavoriteMovies.push(action.payload)
    },

    removeFromFavs: (state, index) => {
      state.value.FavoriteMovies.splice(index, 1)
    }
	},
});

export const { setUser, logoutUser, updateUser, addToFavorites, removeFromFavs } = userSlice.actions;

export default userSlice.reducer;
