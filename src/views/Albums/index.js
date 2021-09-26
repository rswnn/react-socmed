import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';

import { getPhotos } from 'redux/reducers/photos';
import { selectAlbumById } from 'redux/reducers/albums';
import { Modal } from 'components';

const Albums = ({ match }) => {
  const { albumId } = match.params;
  const dispatch = useDispatch();

  const { photos, albums } = useSelector(state => state);
  const album = selectAlbumById(albums, albumId);

  const [showModal, setShowModal] = useState(false);
  const [photoDetail, setPhotoDetail] = useState({});

  useEffect(() => {
    if (albumId) {
      dispatch(getPhotos(albumId));
    }
  }, [albumId]);

  const onExpandImage = photo => {
    setShowModal(true);
    setPhotoDetail(photo);
  };

  const onResetStateModal = () => {
    setShowModal(false);
    setPhotoDetail({});
  };

  const renderPhotos = () => {
    if (!photos.loading && photos.photos.length) {
      return photos.photos.map((photo, i) => {
        return (
          <Col key={ i } >
            <div onClick={ () => onExpandImage(photo) }>
              <img src={ photo.thumbnailUrl } />
            </div>
          </Col>
        );
      });
    }

    return null;
  };

  return (
    <Row>
      <h1>{ album.title }</h1>
      { renderPhotos() }
      <Modal open={ showModal } onCloseModal={ onResetStateModal }>
        <p>{ photoDetail.title }</p>
        <img src={ photoDetail.url } />
      </Modal>
    </Row>
  );
};

export default Albums;
