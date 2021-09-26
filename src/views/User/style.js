import styled from '@emotion/styled';

const Container = styled.div`
    .position-right {
        display: flex;
        justify-content: end;
    }
    .no-padding {
        /* padding: 0 !important; */
    }

`;

const PostWrapper = styled.div`
    min-height: 40px;
    border-radius: 20px;
    border:1px solid #ddd;
    width: calc(100% - 40%);
    margin: 0 auto 30px;
    cursor: pointer;
    padding:10px 20px;
    :hover {
        background-color: #fafafa;
    }
`;

export { Container, PostWrapper };