import React from 'react';
import PropsTypes from 'prop-types';
import { StyledText } from './style';

const Text = props => {
  const {
    text, typeText, margin, className, style, color = '#000000'
  } = props;
  return (
    <StyledText type={ typeText } margin={ margin } className={ className } style={ style } color={ color } { ...props }>
      { text }
    </StyledText>
  );
};

const MemoizedText = React.memo(Text);

Text.propTypes = {
  text: PropsTypes.string,
  margin: PropsTypes.string,
  typeText: PropsTypes.oneOf([
    'extraExtraLargeBold',
    'extraExtraLarge',
    'extraLargeBold',
    'extraLarge',
    'largeBold',
    'large',
    'mediumBold',
    'medium',
    'small',
    'extraSmall',
  ]),
  className: PropsTypes.string,
  style: PropsTypes.object
};

export default MemoizedText;