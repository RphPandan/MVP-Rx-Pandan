/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ColumnContainer, RowContainer,
  Button, HeaderRow, RxContainer,
} from './styles/Boxes';
import { Text2 } from './styles/Text';

const styled = require('styled-components/macro');
// const { deleteRx } = require('./controller');
const InfoColumn = styled(ColumnContainer)`
  row-gap: 10px;
  padding: 5px;
`;

const AdherenceRow = styled(RowContainer)`
  column-gap: 10px;
`;
const AdherentButton = styled(Button)`
  background: ${(props) => { const background = props.adherent ? '#9bbaeb' : '#da5050dc'; return background; }};
  height: 30px;
  width: 60px;
  font-size: 16px;
  font-weight: 700;
`;
const DeleteButton = styled(Button)`
  width: 135px;
  height: 30px;
  align-self: flex-end;
`;

function Rx(props) {
  const { rx, handleRxDelete, handleAdherenceUpdate } = props;
  const {
    // active_ingredients,
    // adherence,
    dosage,
    // quantity,
    directions,
    quantity,
    adherenceBoxes,
    dosage_form,
    display_name,
    // rxcui,
    _id,
  } = rx;

  useEffect(() => {
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    handleRxDelete({ _id });
  };
  const handleAdherenceUpdateClick = (e, i) => {
    e.preventDefault();
    let newQuantity = quantity;
    adherenceBoxes[i] = !adherenceBoxes[i];
    if (adherenceBoxes[i] === true) {
      newQuantity -= 1;
    }
    if (adherenceBoxes[i] === false) {
      newQuantity += 1;
    }
    rx.quantity = newQuantity;
    handleAdherenceUpdate(rx);
  };
  return (
    <RxContainer border="true">
      <HeaderRow>
        <div>
          <b>{`${display_name} - ${dosage}`}</b>
        </div>
        <DeleteButton
          type="button"
          onClick={(e) => { handleDelete(e); }}
        >
          delete
        </DeleteButton>
      </HeaderRow>
      <InfoColumn>
        <Text2>
          {`Directions - ${directions}`}
        </Text2>
        <Text2>
          {`#${quantity} ${dosage_form}  remaining`}
        </Text2>
        <AdherenceRow>

          {adherenceBoxes.map((x, index) => (
            <AdherentButton
              type="button"
              adherent={x}
              key={Math.random()}
              onClick={(e) => { handleAdherenceUpdateClick(e, index); }}
            >
              {index + 1}
            </AdherentButton>
          ))}
        </AdherenceRow>
      </InfoColumn>
    </RxContainer>
  );
}

Rx.propTypes = {
  rx: PropTypes.object.isRequired,
  handleRxDelete: PropTypes.func.isRequired,
  handleAdherenceUpdate: PropTypes.func.isRequired,
};

export default Rx;
