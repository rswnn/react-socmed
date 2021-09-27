import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'components';

import { selectUserById } from 'redux/reducers/users';
import {
  getPosts, addPost, editPost, deletePost
} from 'redux/reducers/posts';
import { getAlbums } from 'redux/reducers/albums';
import {
  getComments, addComment, editComment, deleteComment
} from 'redux/reducers/comments';

const initialStatePostInput = {
  title: '',
  body: '',
  id: ''
};

const initalStateCommentInput = {
  name: '',
  email: '',
  body: '',
  postId: '',
  id: ''
};

const postMode = [
  'addPost',
  'editPost',
  'deletePost'
];
const commentMode =  [
  'addComment',
  'editComment',
  'deleteComment'
];

const useUser = ({ id, history }) => {

  const dispatch = useDispatch();
  
  const [modalMode, setModalMode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTabs, setActiveTabs] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [postInput, setpostInput] = useState(initialStatePostInput);
  const [commentsInput, setCommentsInput] = useState(initalStateCommentInput);

  const postRef = useRef([]);
  const commentRef = useRef([]);
  
  const user = useSelector(state => selectUserById(state.users, id));
  const {
    albums, posts, comments
  } = useSelector(state => state);
  const { successMessage } = Toast();

  useEffect(() => {
    setActiveTabs(true);
    return () => {
      setActiveTabs(false);
      window.onpopstate = () => {
        handleCloseModal();
      };
    };
        
  }, []);

  useEffect(() => {
    const postPromise = dispatch(getPosts(id));
    const postAlbums = dispatch(getAlbums(id));
    
    return () => {
      postPromise.abort();
      postAlbums.abort();
    };
  }, [id, dispatch]);
    
  useEffect(() => {
    if (showModal) {
      if (!posts.loading) {
        if (postMode.includes(modalMode)) {
          if (modalMode !== 'deletePost') {
            handleScrollIntoView(0, 'post');
          }
          handleCloseModal();
        }
      }
    }
  }, [posts]);

  const allowScroll = () => {
    document.documentElement.style.position = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.body.style.overflow = '';
  };

  const onShowComments = (open, id) => {
    if (!open) {
      dispatch(getComments(id));
    }
  };

  const handleRedirect = albumsId => {
    history.push(`${id}/album/${albumsId}`);
  };

  const handleShowModal = useCallback((type, data) => {
    const tempPostMode = postMode.filter((_, i) => i !== 0);
    const tempCommentMode = commentMode.filter((_, i) => i !== 0);
    setModalMode(type);
    setShowModal(true);

    if (tempPostMode.includes(type)) {
      setpostInput({
        title: data.title,
        body: data.body,
        id: data.id
      });
    } else if (tempCommentMode.includes(type)) {
      setCommentsInput({
        id: data.id,
        name: data.name,
        email: data.email,
        body: data.body,
        postId: data.postId
      });
    } else if (commentMode[0] === type) {
      setCommentsInput({
        ...commentsInput,
        postId: data.postId
      });
    }
    if (type === tempCommentMode[1] || type === tempPostMode[1]) {
      setDisableButton(false);
    }
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    if (postMode.includes(modalMode)) {
      setpostInput(initialStatePostInput);
    } else {
      setCommentsInput(initalStateCommentInput);
    }
    setModalMode('');
    setShowModal(false);
    setDisableButton(true);
    allowScroll();
  }, [showModal]);

  const onSubmitPost = () => {
    const tempPostMode = postMode.filter((_, i) => i !== postMode.length - 1);
    let newPost = {};
    if (tempPostMode.includes(modalMode)) {
      newPost = {
        id: postInput.id,
        userId: id,
        title: postInput.title,
        body: postInput.body
      };
    } else {
      newPost = {
        id: commentsInput.id,
        postId: commentsInput.postId,
        name: commentsInput.name,
        email: commentsInput.email,
        body: commentsInput.body
      };
    }
    switch (modalMode) {
    case 'addPost' :
      delete newPost.id;
      dispatch(addPost(newPost));
      return;
    case 'editPost' :
      dispatch(editPost(newPost));
      return;
    case 'deletePost' :
      dispatch(deletePost({ id: postInput.id }));
      return;
    case 'addComment' :
      delete newPost.id;
      dispatch(addComment(newPost));
      handleCloseModal();
      successMessage('Add comment successed');
      return;
    case 'editComment' :
      dispatch(editComment(newPost));
      handleCloseModal();
      successMessage('Edit comment successed');
      return;
    case 'deleteComment' :
      dispatch(deleteComment({ id: commentsInput.id }));
      handleCloseModal();
      successMessage('Delete comment successed');
      return;
    default:
      null;
    }
  };

  const handleChangeInput = React.useCallback(e => {

    const { value, name } = e.target;
    let newInput = {};

    if ((modalMode === postMode[0] && postInput.title !== '' && postInput.body !== '') ||
    modalMode === commentMode[0] && commentsInput.name !== '' && commentsInput.email !== '' && commentsInput.body !== '' ||
    (modalMode === postMode[1]) || (modalMode === commentMode[1])
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
    if (postMode.includes(modalMode)) {
      newInput = {
        ...postInput,
        [name]: value
      };
      setpostInput(newInput);
    } else {
      newInput = {
        ...commentsInput,
        [name]: value
      };
      setCommentsInput(newInput);
    }
  }, [postInput, commentsInput]);

  const handleScrollIntoView = (i, type) => {

    if (i) {
      if (type === 'post') {
        postRef.current[i].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        commentRef.current[i].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
    return;
  };

  return {
    handleChangeInput,
    onSubmitPost,
    handleShowModal,
    handleRedirect,
    onShowComments,
    postRef,
    commentRef,
    user,
    showModal,
    modalMode,
    activeTabs,
    postInput,
    commentsInput,
    posts,
    albums,
    comments,
    handleCloseModal,
    setActiveTabs,
    disableButton
  };
};

export default useUser;