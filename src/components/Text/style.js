import styled from '@emotion/styled';

const StyledText = styled.p`
    font-family: ${props => props.type === 'extraLargeBold'
    || props.type === 'largeBold'
    || props.type === 'mediumBold'
    ? 'PoppinsBold'
    : 'PoppinsRegular'
};
    font-size: ${props => props.type === 'extraExtraLargeBold'
    || props.type === 'extraExtraLarge'
    ? '32px' :
    props.type === 'extraLargeBold'
    || props.type === 'extraLarge'
      ? '24px' :
      props.type === 'largeBold'
    || props.type === 'large'
        ? '20px' :
        props.type === 'mediumBold'
    || props.type === 'medium'
          ? '16px' :
          props.type === 'small'
            ? '14px' :
            props.type === 'extraSmall'
              ? '12px' : '11px'};
    
    margin: ${props => props.margin
    ? props.margin
    : '0px 0px 0px 0px'};

    color: ${props => props.color};
`;

export { StyledText };