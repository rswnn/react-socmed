import styled from '@emotion/styled';
import { colors } from 'constant';

const Container = styled.div`

.title-header {
  display: block;
  font-size: 1em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

`;

const ContainerWrapper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
     transition: 0.3s;
     &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
     }
    background-color: ${colors.tealGreen};
    border-radius: 16px;
`;

const CollapsibleHeader = styled.div`
  padding: 12px 20px 2px 20px;
`;

const CollapsibleContentWrapper = styled.div`
    overflow: hidden;
    transition: height 0.2s ease-in-out;
    border-top: ${props => props.isChild ? 'unset !important' : '1px solid #dee2e6 !important'};
`;

const CollapsibleContent = styled.div`
    padding: 20px 20px 20px 20px;
`;

const CollapsibleHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export {
  Container, ContainerWrapper, CollapsibleHeader,
  CollapsibleContentWrapper, CollapsibleContent, CollapsibleHeaderContent
};