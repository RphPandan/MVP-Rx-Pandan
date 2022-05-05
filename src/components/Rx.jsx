/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ColumnContainer, AlignmentWrapper,
  Button, HeaderRow,
} from './styles/Boxes';

const styled = require('styled-components/macro');
// const { deleteRx } = require('./controller');

const AdherentButton = styled(Button)`
  background: ${(props) => { const background = props.adherent ? '#9bbaeb' : '#da5050dc'; return background; }};
`;
const DeleteButton = styled(Button)`
  width: 135px;
  height: 30px;
  align-self: flex-end;
`;

const RxContainer = styled(ColumnContainer)`
  border-left: none;
  border-right: none;
  border-top: none;
  padding: 10px;
`;

function Rx(props) {
  const { rx, handleRxDelete, handleAdherenceUpdate } = props;
  const {
    active_ingredients,
    // adherence,
    dosage,
    // quantity,
    directions,
    quantity,
    adherenceBoxes,
    // rxcui,
    _id,
  } = rx;
  // const [adhere,
  //   setAdherenceBoxes] = useState(adherenceBoxes);
  // const [adherenceUpdate, setAdherenceUpdate] = useState(false);

  // useEffect(() => {
  // }, [adherenceUpdate]);
  // const handleAdherence = (e, i) => {
  //   console.log('im firing');
  //   e.preventDefault();
  //   const newFrequency = adherenceBoxes;
  //   newFrequency[i] = !newFrequency[i];
  //   console.log(newFrequency);
  //   setAdherenceBoxes(newFrequency);
  //   setAdherenceUpdate((prev) => !prev);
  // };
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
    <AlignmentWrapper>
      <RxContainer border="true">
        <HeaderRow>
          <div>
            {`DrugName- ${active_ingredients} - ${dosage}`}
          </div>
          <DeleteButton
            type="button"
            onClick={(e) => { handleDelete(e); }}
          >
            delete
          </DeleteButton>
        </HeaderRow>
        <div>
          {directions}
        </div>
        <div>
          {`${quantity}  remaining`}
        </div>
        <div>
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
        </div>
      </RxContainer>
    </AlignmentWrapper>
  );
}

Rx.propTypes = {
  rx: PropTypes.object.isRequired,
  handleRxDelete: PropTypes.func.isRequired,
  handleAdherenceUpdate: PropTypes.func.isRequired,
};

export default Rx;
