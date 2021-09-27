import React, {
  useEffect, useRef, useState
} from 'react';
import {
  Icon, Row, Dropdown, Col
} from 'react-materialize';

import { Text } from 'components';
import { colors } from 'constant';

import {
  Container, ContainerWrapper, CollapsibleHeader, CollapsibleContentWrapper, CollapsibleContent, CollapsibleHeaderContent
} from './style';

const Collapsible = ({
  id,
  open,
  children,
  header,
  subHeader = '',
  content = '',
  openText = '',
  closeText = '',
  onClickShow,
  withDropDown = false,
  onClickEditIcon,
  onClickDeleteIcon,
  isChild = false
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(open ? undefined : 0);
  const ref = useRef(null);

  const handleFilterOpening = () => {
    setIsOpen(prev => !prev);
    onClickShow(isOpen);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined;
    
    const resizeObserver = new ResizeObserver(el => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  const renderDropDown = () => {
    if (withDropDown) {
      return (
        <Dropdown
          id={ `Dropdown_${id}` }
          options={ {
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          } }
          trigger={ <Icon className='pointer white-icon'>more_horiz</Icon> }
        >
          <a onClick={ onClickEditIcon }>
            <Icon>edit</Icon>
            <Text
              text={ `Edit ${isChild ? 'Comments' : 'Post'}` }
              typeText='small'
            />
          </a>
          <a onClick={ onClickDeleteIcon }>
            <Icon>delete</Icon>
            <Text
              text={ `Delete ${isChild ? 'Comments' : 'Post'}` }
              typeText='small'
            />
          </a>
        </Dropdown>
      );
    }

    return null;
  };
  
  return (
    <Container className='mb-2'>
      <ContainerWrapper>
        <Row>
          <CollapsibleHeader>
            <CollapsibleHeaderContent>
              <Col>
                <Text text={ header } typeText='largeBold' color={ colors.white } />
                <Text text={ subHeader } typeText='mediumBold' className='mt-1' color={ colors.white }  />
                <Text text={ content } typeText='medium' className='mt-1' color={ colors.white } />
              </Col>
              { renderDropDown() }
            </CollapsibleHeaderContent>
            <Col>
              <Text text={ isOpen ? closeText : openText }
                typeText='small'
                onClick={ handleFilterOpening }
                className='pointer mt-1'
                color={ colors.white }
              />
            </Col>
          </CollapsibleHeader>
        </Row>
        <CollapsibleContentWrapper style={ { height } } isChild={ isChild }>
          <div ref={ ref }>
            <CollapsibleContent>{ children }</CollapsibleContent>
          </div>
        </CollapsibleContentWrapper>
      </ContainerWrapper>
    </Container>
  );
};

export default Collapsible;
