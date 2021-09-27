import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
    
import { requestHandler, path } from 'client';
    
const initialState = {
  loading: false,
  albums: []
};
    
export const getAlbums = createAsyncThunk('albums/getAlbums', async id => {
  const payload = { path: `${path.users}/${id}/${path.albums}` };
  const response = await requestHandler('GET', payload);
  return response;
});
    
export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: {
    [getAlbums.pending]: state => {
      state.loading = true;
    },
    [getAlbums.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.albums = payload;
    },
    [getAlbums.rejected]: state => {
      state.loading = false;
    },
  },
});

export const selectAlbumById = (state, albumId) => {
  if (state.albums) {
    return  state.albums.find(album => album.id.toString() === albumId);
  
  }
};
      
export const albumsReducer = albumsSlice.reducer;
export default albumsReducer;