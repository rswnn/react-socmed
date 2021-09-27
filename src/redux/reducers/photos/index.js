import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
      
import { requestHandler, path } from 'client';
      
const initialState = {
  loading: false,
  photos: []
};
      
export const getPhotos = createAsyncThunk('photos/getPhotos', async id => {
  const payload = { path: `${path.albums}/${id}/${path.photos}` };
  const response = await requestHandler('GET', payload);
  return response;
});
      
export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: {
    [getPhotos.pending]: state => {
      state.loading = true;
    },
    [getPhotos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.photos = payload;
    },
    [getPhotos.rejected]: state => {
      state.loading = false;
    },
  },
});
        
export const photosReducer = photosSlice.reducer;
export default photosReducer;