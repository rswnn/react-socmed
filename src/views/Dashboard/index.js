import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text } from 'components';

import { getUsers } from 'redux/reducers/users';
import { Container } from './style';

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
    <Container>
      { users && users.map((user, i) => {
        return (
          <div key={ i } onClick={ () => handleRedirect(user.id) }>
            <Text text={ user.name } typeText='extraLarge' />
          </div>
        );
      }) }
    </Container>
  );
};

export default Dashboard;
