/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { ColumnContainer, RowContainer, AlignmentWrapper } from './styles/Boxes';

const { submitRxToList } = require('./controller');

const Form = styled(ColumnContainer)`
`;

const FormContainer = styled(ColumnContainer)`
`;

function RxDosageSelector({ drug, setSelectedDrugIndex }) {
  const [directions, setDirections] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [quantity, setQuantity] = useState('');
  const { active_ingredients, openfda, pharm_class } = drug;
  const { rxcui } = openfda;

  const handleSubmit = (e) => {
    e.preventDefault();
    const rx = {
      active_ingredients,
      directions,
      frequency,
      quantity,
      rxcui,
      pharm_class,

    };
    submitRxToList(rx)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AlignmentWrapper>
      <FormContainer rowGap="20px">
        <RowContainer columnGap="20px">
          <div>{active_ingredients}</div>
          <div>
            frequency:
            {frequency}
          </div>
          <div>
            quantity:
            {quantity}
          </div>

        </RowContainer>
        <Form as="form" rowGap="10px">
          <input
            id="directions"
            type="text"
            placeholder="...directions"
            value={directions}
            onChange={(e) => { e.preventDefault(); setDirections(e.target.value); }}
            required
          />

          <input
            id="frequency"
            type="number"
            required
            min="1"
            placeholder="...how often do you take this every day"
            onChange={(e) => { e.preventDefault(); setFrequency(Number(e.target.value)); }}
          />
          <RowContainer columnGap="20px">

            <input
              type="number"
              placeholder="...quantity"
              value={quantity}
              required
              min="1"
              onChange={(e) => { e.preventDefault(); setQuantity(Number(e.target.value)); }}
            />

          </RowContainer>

          <button
            type="submit"
            onClick={(e) => { handleSubmit(e); }}
          >
            Save new Rx
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setSelectedDrugIndex(null); }}
          >
            restart
          </button>
        </Form>
      </FormContainer>
    </AlignmentWrapper>

  );
}

RxDosageSelector.propTypes = {
  drug: PropTypes.shape({
    active_ingredients: PropTypes.string.isRequired,
    pharm_class: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    openfda: PropTypes.shape({
      rxcui: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedDrugIndex: PropTypes.func.isRequired,
};

export default RxDosageSelector;
