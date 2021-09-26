import React from 'react';
import { Container as ContainerPage } from './style';

const Container = ({ children }) => {
  return (
    <ContainerPage>
      { children }
    </ContainerPage>
  );
};

export default Container;
