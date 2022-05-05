/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Rx from './Rx';
import { MainHeader, AlignmentWrapper, ColumnContainer } from './styles/Boxes';
import { Title2 } from './styles/Text';

const styled = require('styled-components/macro');

const RxsContainer = styled(ColumnContainer)`
  overflow-y: auto;
  height: 50em;
  border-radius: 12px;
`;
// const css = require('styled-components/macro');

function Rxs(props) {
  const {
    rxList, handleRxDelete,
    handleAdherenceUpdate,
  } = props;
  return (
    <AlignmentWrapper>
      <ColumnContainer>
        <MainHeader background="primary">
          <Title2 background="primary" color="secondary">Medication List</Title2>
        </MainHeader>
        <RxsContainer border="true">
          {rxList.map((rx) => (
            <Rx
              handleAdherenceUpdate={handleAdherenceUpdate}
              handleRxDelete={handleRxDelete}
              key={rx._id}
              rx={rx}
            />
          ))}
        </RxsContainer>
      </ColumnContainer>
    </AlignmentWrapper>
  );
}

Rxs.propTypes = {
  rxList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleRxDelete: PropTypes.func.isRequired,
  handleAdherenceUpdate: PropTypes.func.isRequired,
};

export default Rxs;
