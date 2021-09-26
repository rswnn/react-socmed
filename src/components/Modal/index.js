import React from 'react';
import {
  Button, Col, Icon, Modal
} from 'react-materialize';

import { Text } from 'components';

import { FooterModal } from './style';

const index = ({
  open, children, onCloseModal, showFooter = false, onOk, isDeleteModal = false, mode
}) => {

  const renderFooter = () => {
    if (showFooter) {
      return (
        <FooterModal>
          <Button onClick={ onOk }>
            {
              isDeleteModal &&
                <Icon>delete</Icon>
            }
            <Text text={ isDeleteModal ? 'Delete' : 'Sent' } typeText='small' color='#fff' />
          </Button>
        </FooterModal>
      );
    }
  };

  return (
    <Modal
      bottomSheet={ false }
      fixedFooter={ false }
      id={ `Modal-${mode}` }
      open={ open }
      options={ {
        dismissible: true,
        endingTop: '20%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
      } }
    >
      <Icon key onClick={ onCloseModal } className='icon-close-modal'>close</Icon>
      { children }
      { renderFooter() }
    </Modal>
  );
};

export default index;
