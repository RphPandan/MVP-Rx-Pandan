/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ColumnContainer, AlignmentWrapper } from './styles/Boxes';
import Interaction from './Interaction';

const { deepSearchByKey } = require('./controller');

function Interactions(props) {
  const {
    interactions,
  } = props;
  const { fullInteractionTypeGroup } = interactions;
  const [descriptions] = useState(deepSearchByKey(fullInteractionTypeGroup, 'description'));
  return (
    <AlignmentWrapper>
      <ColumnContainer>
        { descriptions.map((interaction, index) => (
          <Interaction
            index={index}
            key={JSON.stringify(interaction)}
            interaction={interaction}
          />
        ))}
      </ColumnContainer>
    </AlignmentWrapper>
  );
}

Interactions.propTypes = {
  // interactionsJSON: PropTypes.string.isRequired,
  interactions: PropTypes.shape({
    fullInteractionTypeGroup: PropTypes.arrayOf(PropTypes.shape({
      sourceDisclaimer: PropTypes.string.isRequired,
      sourceName: PropTypes.string.isRequired,
      fullInteractionsType: PropTypes.arrayOf(PropTypes.shape({
        interactionPair: PropTypes.arrayOf(PropTypes.shape({
          description: PropTypes.string.isRequired,
        })).isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};

export default Interactions;
