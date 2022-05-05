import React from 'react';
import PropTypes from 'prop-types';
import { RowContainer, ColumnContainer, AlignmentWrapper } from './styles/Boxes';

function Interactions() {
  // const {
  //   // interactionsJSON,
  //   // interactions,
  // } = props;
  // const {  } = interactions;
  return (
    <AlignmentWrapper>
      <ColumnContainer>
        <RowContainer>
          <div>placeholder...</div>
        </RowContainer>
      </ColumnContainer>
    </AlignmentWrapper>
  );
}

Interactions.propTypes = {
  // interactionsJSON: PropTypes.string.isRequired,
  interactions: PropTypes.shape({

  }).isRequired,
};

export default Interactions;
