import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovie: []
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

		updateUser: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
