import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Toast } from 'components';
      
import { requestHandler, path } from 'client';
      
const { errorMessage, successMessage } = Toast();

const initialState = {
  loading: false,
  posts: [],
  savedPost: []
};

export const getPosts = createAsyncThunk('posts/getPosts', async(id, thunkAPI) => {
  const payload = { path: `${path.users}/${id}/${path.posts}` };
  const response = await requestHandler('GET', payload, thunkAPI.signal);
  return response;
});

export const addPost = createAsyncThunk('posts/addPost', async(data, thunkAPI) => {
  const payload = {
    path: `${path.posts}`,
    body: data
  };
  const response = await requestHandler('POST', payload, thunkAPI.signal);
  return response;
});

export const editPost = createAsyncThunk('posts/editPost', async(data, thunkAPI) => {
  const payload = {
    path: `${path.posts}/${data.id}`,
    body: data
  };
  const response = await requestHandler('PUT', payload, thunkAPI.signal);
  return response;
});

export const deletePost = createAsyncThunk('posts/deletePost', async(data, thunkAPI) => {
  const payload = { path: `${path.posts}/${data.id}` };
  const response = await requestHandler('DELETE', payload, thunkAPI.signal);
  return {
    ...response,
    id: data.id
  };
});
      
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: state => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      const filteredPost = [...state.savedPost].filter(post => payload.some(data => data.userId.toString() === post.userId.toString()));
      state.loading = false;
      state.posts = filteredPost.concat(payload);
    },
    [getPosts.rejected]: state => {
      state.loading = false;
    },
    [addPost.pending]: state => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, { payload }) => {
      const findSavedPostId = state.savedPost.findIndex(save => save.id.toString() === payload.id.toString());
      let newData = {};
      if (findSavedPostId !== -1) {
        newData = { ...payload };
      } else {
        newData = {
          ...payload,
          id: uuidv4()
        };
      }
      state.loading = false;
      state.posts = [newData].concat(state.posts);
      state.savedPost = [...state.savedPost, newData];
      successMessage('Add Post Successed');
    },
    [addPost.rejected]: state => {
      state.loading = false;
      errorMessage('Somethink went wrong');
    },
    [editPost.pending]: state => {
      state.loading = true;
    },
    [editPost.fulfilled]: (state, { payload }) => {
      const findPost = state.posts.findIndex(post => post.id.toString() === payload.id.toString());
      const findSavedPost = state.savedPost.findIndex(post => post.id.toString() === payload.id.toString());
      state.posts[findPost] = payload;
      state.savedPost[findSavedPost] = payload;
      state.loading = false;
      state.posts = [...state.posts];
      state.savedPost = [...state.savedPost];
      successMessage('Edit Post Successed');
    },
    [editPost.rejected]: state => {
      state.loading = false;
      errorMessage('Somethink went wrong');
    },
    [deletePost.pending]: state => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      const filteredPost = state.posts.filter(post => post.id.toString() !== payload.id.toString());
      const filteredSavedPost = state.savedPost.filter(post => post.id.toString() !== payload.id.toString());
      state.loading = false;
      state.posts = [...filteredPost];
      state.savedPost = [...filteredSavedPost];
      successMessage('Delete Post Successed');
    },
    [deletePost.rejected]: state => {
      state.loading = false;
      errorMessage('Somethink went wrong');
    },
  },
});
        
export const postsReducer = postsSlice.reducer;
export default postsReducer;