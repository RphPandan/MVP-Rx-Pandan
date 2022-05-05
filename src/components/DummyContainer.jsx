import React from 'react';
import PropTypes from 'prop-types';
import { DummyRxContainer, AddRxButton } from './styles/Boxes';
import { AddRx } from './styles/Icons';

function DummyContainer(props) {
  const { setInputModal } = props;
  return (
    <DummyRxContainer>
      <AddRxButton
        as="button"
        type="button"
        onClick={() => { setInputModal(true); }}
      >
        <AddRx />
      </AddRxButton>
    </DummyRxContainer>
  );
}

DummyContainer.propTypes = {
  setInputModal: PropTypes.func.isRequired,
};

export default DummyContainer;
