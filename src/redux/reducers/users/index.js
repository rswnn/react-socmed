import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
  
import { requestHandler, path } from 'client';
  
const initialState = {
  loading: false,
  users: []
};
  
export const getUsers = createAsyncThunk('users/getUsers', async(_, thunkAPI) => {
  const payload = { path: path.users };
  const response = await requestHandler('GET', payload, thunkAPI.signal);
  return await response;
});
  
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: state => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [getUsers.rejected]: state => {
      state.loading = false;
    },
  },
});

export const selectUserById = (state, userId) => {
  if (state.users) {
    return  state.users.find(user => user.id.toString() === userId);

  }
};
    
export const userReducer = userSlice.reducer;
export default userReducer;