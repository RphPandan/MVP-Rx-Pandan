/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import {
  MainHeader, AlignmentWrapper,
  ColumnContainer, Button,
} from './styles/Boxes';
import { Title2 } from './styles/Text';
import InteractionsModal from './InteractionsModal';

const CheckInteractionsButton = styled(Button)`
  width: 200px;
  height: 50px;
`;
const InteractionContainers = styled(ColumnContainer)`
  overflow-y: auto;
  border-radius: 12px;
`;

function RxInteractions(props) {
  const {
    rxList, setInteractionModal, interactionModal,
  } = props;
  // const [interactionList, setInteractionList] = useState([]);

  return (
    <InteractionContainers>
      <MainHeader background="primary">
        <Title2 background="primary" color="secondary">Potential Interactions</Title2>
      </MainHeader>
      <AlignmentWrapper>
        <CheckInteractionsButton
          type="button"
          onClick={(e) => { e.preventDefault(); setInteractionModal(true); }}
        >
          CheckInteractionsButton
        </CheckInteractionsButton>
      </AlignmentWrapper>
      {interactionModal
        ? (
          <InteractionsModal
            rxList={rxList}
            setInteractionModal={setInteractionModal}
          />
        ) : null}
    </InteractionContainers>
  );
}

RxInteractions.propTypes = {
  rxList: PropTypes.arrayOf(PropTypes.shape({
    rxcui: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
  setInteractionModal: PropTypes.func.isRequired,
  interactionModal: PropTypes.bool.isRequired,
};

export default RxInteractions;
