import React from 'react';
import {
  Tabs, Tab, Row, Icon, Col, TextInput, Textarea, Card, CardTitle, ProgressBar
} from 'react-materialize';

import {
  Collapsible, Modal, Text
} from 'components';
import { colors } from 'constant';

import useUser from './useUser';
import images from 'assets/images';
import { Container, PostWrapper } from './style';

const User = ({ history, match }) => {
  const { id } = match.params;
  const {
    onShowComments,
    handleChangeInput,
    handleRedirect,
    handleShowModal,
    postRef,
    commentRef,
    user,
    showModal,
    modalMode,
    activeTabs,
    postInput,
    commentsInput,
    onSubmitPost,
    posts,
    albums,
    comments,
    handleCloseModal,
    disableButton
  } = useUser({
    id: id,
    history: history
  });

  const renderPosts = () => {
    if (posts.posts.length && !albums.loading) {
      return posts.posts.map((post, i) => {
        return (
          <div key={ i }
            ref={ el => postRef.current[i] = el }
          >
            <Collapsible
              id={ i }
              header={ post.title }
              content={ post.body }
              openText='Show Comments'
              closeText='Close Comments'
              onClickShow={ open => onShowComments(open, post.id) }
              withDropDown
              onClickEditIcon={ () => handleShowModal('editPost', post) }
              onClickDeleteIcon={ () => handleShowModal('deletePost', post) }
            >
              {
                comments.loading && comments.comments.length ?
                  <Text text='...Loading' /> :
                  <React.Fragment>
                    <Text
                      text='Add Comment'
                      typeText='mediumBold'
                      onClick={ () => handleShowModal('addComment', { postId: post.id }) }
                      className='pointer mb-2'
                      color={ colors.white }
                    />
                    { renderComments(post.id) }
                  </React.Fragment>
              }
            </Collapsible>
          </div>
        );
      });
    }
    return (
      <Row>
        <Row>
          <Col s={ 12 } className='mt-3'>
            <ProgressBar />
          </Col>
        </Row>
        <Row>
          <Col s={ 6 }>
            <ProgressBar />
          </Col>
        </Row>
        <Row>
          <Col s={ 3 }>
            <ProgressBar />
          </Col>
        </Row>
      </Row>
    );
  };

  const renderAlbums = () => {
    if (albums.albums.length) {
      return albums.albums.map((album, i) => {
        return (
          <Col key={ i }
            m={ 4 }
            s={ 12 }
          >
            <Card
              closeIcon={ <Icon>close</Icon> }
              header={ <CardTitle image={ images.IluGallery } /> }
              revealIcon={ <Icon>more_vert</Icon> }
            >
              <Text
                text={ album.title }
                typeText='mediumBold'
                color={ colors.tealGreen }
                className='title-albums'
              />
              <Text
                text='View the album'
                onClick={ () =>  handleRedirect(album.id) }
                typeText='small'
                color={ colors.tealGreen }
                className='pointer'
              />
            </Card>
          </Col>
        );
      });
    }
    return <React.Fragment/>;
  };

  const renderComments = postId => {
    const filteredComments = comments.comments.filter(comment => comment.postId === postId);
    return filteredComments.map((comment, i) => {
      return (
        <div key={ i }
          ref={ el => commentRef.current[i] = el }
        >
          <Collapsible
            id={ `${i}-child` }
            header={ comment.name }
            subHeader={ comment.email }
            content={ comment.body }
            onClickEditIcon={ () => handleShowModal('editComment', {
              ...comment,
              postId: postId
            }) }
            onClickDeleteIcon={ () => handleShowModal('deleteComment', {
              ...comment,
              postId: postId
            }) }
            withDropDown
            isChild
          />
        </div>
      );
    });
  };

  const renderUserDetail =  () => {
    if (user) {
      return (
        <Row >
          <Text
            text={ user ? user.name : '' }
            typeText='extraExtraLarge'
            className='mb-2'
            color={ colors.tealGreen }
          />
          <Col l={ 6 }>
            <Row className='mb-small header-user'>
              <Col className='header-user'> <Icon className='icon-align' tiny>person</Icon></Col>
              <Col>
                <Text text={ user ? user.username : '' } typeText='mediumBold' color={ colors.tealGreen } />
              </Col>
            </Row>
            <Row className='mb-small'>
              <Col className='header-user'> <Icon className='icon-align' tiny>email</Icon></Col>
              <Col>
                <Text text={ user ? user.email : '' } typeText='mediumBold' color={ colors.tealGreen } />
              </Col>
            </Row>
            <Row className='mb-small'>
              <Col className='header-user'> <Icon className='icon-align' tiny>phone</Icon></Col>
              <Col>
                <Text text={ user ? user.phone : '' } typeText='mediumBold' color={ colors.tealGreen } />
              </Col>
            </Row>
            <Row className='mb-small'>
              <Col className='header-user'> <Icon className='icon-align' tiny>link</Icon></Col>
              <Col>
                <Text text={ user ? user.website : '' } typeText='mediumBold' color={ colors.tealGreen } />
              </Col>
            </Row>
          </Col>
          <Col l={ 6 } >
            <Row className='mb-small position-right'>
              <Col>
                <Text text={ user ? `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}` : '' }
                  typeText='small'
                  className='right-align'
                  color={ colors.tealGreen }
                />
              </Col>
              <Col className='no-padding header-user'> <Icon className='icon-align' small>home</Icon></Col>
            </Row>
            <Row className='mb-small position-right'>
              <Col>
                <Text
                  text={ user ? `${user.company.name} ${user.company.catchPhrase} ${user.company.bs}` : '' }
                  typeText='small'
                  className='right-align'
                  color={ colors.tealGreen }
                />
              </Col>
              <Col className='no-padding header-user'> <Icon className='icon-align' small>location_city</Icon></Col>
            </Row>
          </Col>
        </Row>
      );
    }
  };

  const renderContentModal = () => {
    switch (modalMode) {
    case 'addPost':
    case 'editPost':
      return (
        <Col>
          <Text
            text={ `${modalMode === 'addPost' ? 'Add' : 'Edit'} your Post` }
            typeText='largeBold'
            color={ colors.tealGreen }
          />
          <TextInput
            value={ postInput.title }
            placeholder='Write Title here'
            name='title'
            onChange={ handleChangeInput }
          />
          <Textarea
            value={ postInput.body }
            placeholder='Write Body here'
            name='body'
            onChange={ handleChangeInput }
          />
        </Col>
      );
    case 'deletePost':
    case 'deleteComment':
      return (
        <Col>
          <Text
            text={ `Are you sure delete this ${modalMode === 'deletePost' ? 'post' : 'comment'}?` }
            typeText='largeBold'
            color={ colors.tealGreen }
          />
        </Col>
      );
    case 'addComment':
    case 'editComment':
      return (
        <Col>
          <Text
            text={ `${modalMode === 'addComment' ? 'Add' : 'Edit' } your comment` }
            typeText='largeBold'
            color={ colors.tealGreen }
          />
          <TextInput
            value={ commentsInput.name }
            placeholder='Write Title here'
            name='name'
            onChange={ handleChangeInput }
          />
          <TextInput
            value={ commentsInput.email }
            placeholder='Write Title here'
            name='email'
            onChange={ handleChangeInput }
          />
          <Textarea
            value={ commentsInput.body }
            placeholder='Write Body here'
            name='body'
            onChange={ handleChangeInput }
          />
        </Col>
      );
    default:
      return null;
    }
  };

  console.log(modalMode);

  return (
    <Container className='container'>
      { renderUserDetail() }
      <PostWrapper
        onClick={ () => handleShowModal('addPost') }
      >
        <Text text='What do you mind ?' typeText='medium' color={ colors.tealGreen } />
      </PostWrapper>
      <Tabs
        className='tab-demo z-depth-1'
      >
        <Tab
          active={ activeTabs }
          options={ {
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          } }
          title='Posts'
        >
          <Row className='mt-2'>
            { renderPosts() }
          </Row>
        </Tab>
        <Tab
          options={ {
            duration: 300,
            onShow: null,
            responsiveThreshold: Infinity,
            swipeable: false
          } }
          title='Albums'
        >
          <Row className='mt-2'>
            { renderAlbums() }
          </Row>
        </Tab>
      </Tabs>
      <Modal
        open={ showModal }
        onCloseModal={ handleCloseModal }
        showFooter
        onOk={ onSubmitPost }
        isDeleteModal={ modalMode === 'deletePost' || modalMode === 'deleteComment' }
        mode={ modalMode }
        disableButton={ disableButton }
      >
        { renderContentModal() }
      </Modal>
    </Container>
  );
};

export default User;
