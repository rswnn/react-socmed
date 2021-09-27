import React from 'react';
import { Text } from 'components';
import { colors } from 'constant';

import { Container } from './style';

const Navbar = ({ history }) => {

  return (
    <Container >
      <Text
        text='The Friends'
        color={ colors.white }
        typeText='extraLarge'
        className='nav-logo pointer'
        onClick={ () => history.push('/') }
      />
    </Container>
  );
};

export default Navbar;
