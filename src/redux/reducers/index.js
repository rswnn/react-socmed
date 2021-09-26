import { combineReducers } from 'redux';

import userReducer from './users';
import albumsReducer from './albums';
import postsReducer from './posts';
import commentsReducer from './comments';
import photosReducer from './photos';

const rootReducer = combineReducers({
  users: userReducer,
  posts: postsReducer,
  albums: albumsReducer,
  comments: commentsReducer,
  photos: photosReducer
});

export { rootReducer };