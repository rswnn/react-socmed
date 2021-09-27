import styled from '@emotion/styled';
import { colors } from 'constant';

const Container = styled.div`
    background-color: ${colors.tealGreen};
    height: 70px;
    width: 100%;
    padding: 20px;
    position: relative;
    z-index: 99;
    p {
        display: inline;
    }
`;

export { Container };