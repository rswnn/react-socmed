import React from 'react';
import PropsTypes from 'prop-types';

import { ButtonStyled } from './style';

const Button = props => {
  const {
    children, color, disable
  } = props;
  return (
    <ButtonStyled color={ color } disable={ disable } { ...props }>
      { children }
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropsTypes.element,
  color: PropsTypes.string,
  disable: PropsTypes.bool
};

export default Button;