import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
`;

const PhotoInfo = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    top: 35px;
    background-color: ${props => props.loading ? 'white' : 'unset'};
    
    .info {
        position: absolute;
        bottom: -100px;
        transition: 0.3s;
        width: 100%;
        padding: 20px;
    }
    :hover {
        .info {
        position: absolute;
        bottom: 0;
        padding: 20px 10px;
        backdrop-filter: blur(10px);
        width: 100%;
        transition: 0.3s;
        padding: 20px;
    }
    }

`;

export { Container, PhotoInfo };