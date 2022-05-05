import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Text } from './styles/Text';
import { RowContainer, ColumnContainer } from './styles/Boxes';

const WarningText = styled(Text)`
  font-size: 14px;
`;
const WarningContainer = styled(RowContainer)`
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
`;

function Interaction(props) {
  const { interaction, index } = props;
  const { severity, description } = interaction;
  return (
    <WarningContainer border="true">
      <WarningText
        css={`
          color: 'red';
        `}
      >
        {`${index + 1}:  `}
      </WarningText>
      <ColumnContainer>
        <RowContainer>
          <WarningText>{`description - ${description}`}</WarningText>
        </RowContainer>
        <RowContainer>
          <WarningText>{`severity - ${severity}`}</WarningText>
        </RowContainer>
      </ColumnContainer>
    </WarningContainer>
  );
}

Interaction.propTypes = {
  index: PropTypes.number.isRequired,
  interaction: PropTypes.shape({
    severity: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Interaction;
