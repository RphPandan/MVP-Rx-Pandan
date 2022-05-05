/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  ColumnContainer, RowContainer,
  FormButton,
} from './styles/Boxes';
import { DirectionInput, QuantityInput, FrequencyInput } from './styles/Forms';

const Form = styled(RowContainer)`
  justify-content: space-between;
  padding: 10px;
`;

const FormContainer = styled(ColumnContainer)`
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const ButtonContainer = styled(ColumnContainer)`

`;

const DirectionContainer = styled(ColumnContainer)`
  width: 80%;
  row-gap: 10px;
`;

const DrugText = styled.p`
  margin: 5px;
`;

function RxDosageSelector({
  setInputModal, handleRxSubmit,
  drug, setSelectedDrugIndex,
}) {
  const [directions, setDirections] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [quantity, setQuantity] = useState('');

  const {
    active_ingredients, openfda,
    pharm_class, dosage, dosage_form,
    brand_name, generic_name,
  } = drug;
  const { rxcui } = openfda;

  const handleSubmit = (e) => {
    console.log(e);
    let display_name;
    let gen;
    if (generic_name.length > 30) {
      gen = `${generic_name.slice(0, 50)}...`;
    } else {
      gen = generic_name;
    }
    const brand = brand_name.split(' ')[0].toLowerCase();
    if (!generic_name.toLowerCase().includes(brand)) {
      display_name = `${brand_name} - ${gen}`;
    } else {
      display_name = generic_name;
    }
    const rx = {
      active_ingredients,
      dosage,
      directions,
      frequency,
      quantity,
      rxcui,
      pharm_class,
      dosage_form,
      brand_name,
      generic_name,
      display_name,
      adherenceBoxes: [...Array(frequency).keys()].map(() => false),
    };
    // e.preventDefault();
    handleRxSubmit(rx);
    setInputModal(false);
  };
  return (
    <FormContainer rowGap="20px">
      <RowContainer columnGap="20px">
        <DrugText>
          <b>{`${active_ingredients} ${dosage} ${dosage_form}`}</b>
        </DrugText>
        {/* <DrugText>
          frequency:
          {frequency}
        </DrugText>
        <DrugText>
          quantity:
          {quantity}
        </DrugText> */}
      </RowContainer>
      <form>
        <Form rowGap="10px">
          <DirectionContainer>
            <DirectionInput
              id="directions"
              type="text"
              value={directions}
              onChange={(e) => { e.preventDefault(); setDirections(e.target.value); }}
              minLength="8"
              placeholder="...directions"
              required
            />
            <FrequencyInput
              id="frequency"
              type="number"
              required
              min="1"
              placeholder="...frequency to take every day"
              onChange={(e) => { e.preventDefault(); setFrequency(Number(e.target.value)); }}
            />
            <QuantityInput
              type="number"
              placeholder="...quantity"
              value={quantity}
              required
              min="1"
              onChange={(e) => { e.preventDefault(); setQuantity(Number(e.target.value)); }}
            />
          </DirectionContainer>
          <ButtonContainer rowGap="20px">
            <FormButton
              as="button"
              type="submit"
              onClick={(e) => { handleSubmit(e); }}
            >
              Save Medication
            </FormButton>
            <FormButton
              type="button"
              onClick={(e) => { e.preventDefault(); setSelectedDrugIndex(null); }}
            >
              restart
            </FormButton>
          </ButtonContainer>
        </Form>
      </form>
    </FormContainer>
  );
}
RxDosageSelector.propTypes = {
  drug: PropTypes.shape({
    active_ingredients: PropTypes.string.isRequired,
    dosage: PropTypes.string.isRequired,
    generic_name: PropTypes.string.isRequired,
    brand_name: PropTypes.string.isRequired,
    dosage_form: PropTypes.string.isRequired,
    pharm_class: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    openfda: PropTypes.shape({
      rxcui: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedDrugIndex: PropTypes.func.isRequired,
  handleRxSubmit: PropTypes.func.isRequired,
  setInputModal: PropTypes.func.isRequired,
};

export default RxDosageSelector;
