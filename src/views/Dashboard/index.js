import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Icon, Col,  Card, CardTitle, ProgressBar
} from 'react-materialize';

import { Text } from 'components';
import { colors } from 'constant';

import images from 'assets/images';
import { getUsers } from 'redux/reducers/users';
import { Container } from './style';

const listAvatar = [
  images.IluAva1,
  images.IluAva2,
  images.IluAva3,
  images.IluAva4,
  images.IluAva5,
  images.IluAva6,
  images.IluAva7,
  images.IluAva8,
  images.IluAva9,
  images.IluAva10
];

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, users } = useSelector(state => state.users);

  useEffect(() => {
    const userData = dispatch(getUsers());
    return () => {
      userData.abort();
    };
  }, [dispatch]);

  const handleRedirect = id => {
    history.push(`/user/${id}`);
  };

  return (
    <Container className='container'>
      <Text text='Your Friends' typeText='extraExtraLargeBold' color={ colors.tealGreen } />
      <Row>
        { !loading && users ? users.map((user, i) => {
          return (
            <Col key={ i }
              m={ 4 }
              s={ 12 }
            >
              <Card
                closeIcon={ <Icon>close</Icon> }
                header={ <CardTitle image={ listAvatar[i] } /> }
                revealIcon={ <Icon>more_vert</Icon> }
                className='pointer'
                onClick={ () =>  handleRedirect(user.id) }
              >
                <Text
                  text={ user.name }
                  typeText='small'
                  color={ colors.tealGreen }
                />
              </Card>
            </Col>
          );
        }) :
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
        }
      </Row>
    </Container>
  );
};

export default Dashboard;
