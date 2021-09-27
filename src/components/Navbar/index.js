import React from 'react';
import { Navbar as Header, Icon } from 'react-materialize';

import { Text } from 'components';
import { colors } from 'constant';

const Navbar = () => {
  return (
    <Header
      alignLinks='right'
      brand={ <Text text='The Friends' color={ colors.white } typeText='large' className='nav-logo' /> }
      id='mobile-nav'
      menuIcon={ <Icon>menu</Icon> }
      options={ {
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      } }
      className='teal lighten-2 navbar'
    />
  );
};

export default Navbar;
