import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
      
import { requestHandler, path } from 'client';
      
const initialState = {
  loading: false,
  comments: [],
  saveComments: []
};
      
export const getComments = createAsyncThunk('comments/getComments', async id => {
  const payload = { path: `${path.posts}/${id}/${path.comments}` };
  const response = await requestHandler('GET', payload);
  return response;
});
      
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: {
      reducer(state, action) {
        const newData = {
          ...action.payload,
          id: uuidv4()
        };
        const comments = state.comments;
        const findPostId = comments.findIndex(com => com.postId.toString() === action.payload.postId.toString());
        state.comments.splice(findPostId, 0, newData);
        state.saveComments.push(newData);
        !!state.loading;
      },
    },
    editComment: {
      reducer(state, action) {
        const comments = state.comments;
        const saveComments = state.saveComments;
        const findComment = comments.findIndex(comment => comment.id.toString() === action.payload.id.toString());
        const findSavedComment = saveComments.findIndex(comment => comment.id.toString() === action.payload.id.toString());
        comments[findComment] = action.payload;
        saveComments[findSavedComment] = action.payload;
        state.comments.splice(0, state.comments.length, ...comments);
        state.saveComments.splice(0, state.saveComments.length, ...saveComments);
        !!state.loading;
      }
    },
    deleteComment: {
      reducer(state, action) {
        const comments = state.comments;
        const saveComments = state.saveComments;
        const filteredComment = comments.filter(comment => comment.id.toString() !== action.payload.id.toString());
        const filteredSavedComent = saveComments.filter(comment => comment.id.toString() !== action.payload.id.toString());
        state.comments.splice(0, state.comments.length, ...filteredComment);
        state.saveComments.splice(0, state.saveComments.length, ...filteredSavedComent);
        !!state.loading;
      }
    }
  },
  extraReducers: {
    [getComments.pending]: state => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, { payload }) => {
      const newComments = [...state.comments, ...payload];
      const filterDuplicateComments = newComments.reduce((next, prev) => {
        const findId = next.find(item => item.id.toString() === prev.id.toString());
        if (!findId) {
          return next.concat([prev]);
        } else {
          return next;
        }
      }, []);
      state.comments = [...filterDuplicateComments];
      state.loading = false;
    },
    [getComments.rejected]: state => {
      state.loading = false;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {
  addComment, editComment, deleteComment
} = commentsSlice.actions;

export default commentsReducer;