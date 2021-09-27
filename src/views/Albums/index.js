import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, CardTitle, Icon, ProgressBar
} from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Text } from 'components';
import { colors } from 'constant';

import { getPhotos } from 'redux/reducers/photos';
import { selectAlbumById } from 'redux/reducers/albums';
import { Container, PhotoInfo } from './style';

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
          <Col key={ i }
            m={ 4 }
            s={ 12 }
          >
            <Card
              closeIcon={ <Icon>close</Icon> }
              header={ <CardTitle image={ photo.thumbnailUrl }>{ photo.title }</CardTitle> }
              revealIcon={ <Icon>more_vert</Icon> }
              onClick={ () => onExpandImage(photo) }
              className='pointer'
            >
              <Text
                text='Expand this image'
                onClick={ () =>  onExpandImage(photo) }
                typeText='medium'
                className='pointer'
                color={ colors.tealGreen }
              />
            </Card>
          </Col>
        );
      });
    }

    return (
      <Row>
        <Col s={ 12 } className='mt-3 mb-2'>
          <ProgressBar />
        </Col>
        <Col s={ 12 } className='mb-2'>
          <ProgressBar />
        </Col>
        <Col s={ 12 } className='mb-2'>
          <ProgressBar />
        </Col>
      </Row>
    );
  };

  return (
    <Container className='container'>
      <Row>
        <Text
          text={ `The photos of : ${ album.title }` }
          typeText='extraExtraLarge'
          color={ colors.tealGreen }
          className='mb-2'
        />
        { renderPhotos() }
        <Modal open={ showModal } onCloseModal={ onResetStateModal } mode='photo'>
          <Col>
            <img src={ photoDetail.url } />
            <PhotoInfo className='photo-info'>
              <Text
                text={ photoDetail.title }
                className='info'
                typeText='large'
                color={ colors.white }
              />
            </PhotoInfo>
          </Col>
        </Modal>
      </Row>
    </Container>
  );
};

export default Albums;
