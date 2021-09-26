import styled from '@emotion/styled';
import { Button } from 'react-materialize';

const ButtonStyled = styled(Button)`
    background-color: ${props => props.color ? props.disable ? 'white' : props.color  : 'grey'};
    padding: 5px 10px;
    text-align: center;
    border-radius: 10px;
    p {
        color: ${props => props.disable ?  props.color : 'white' };
    }
    :hover {
        cursor: pointer;
    }
`;

export { ButtonStyled };