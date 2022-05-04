/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/macro';
import { RowContainer, ColumnContainer, AlignmentWrapper } from './styles/Boxes';
// import Text from './styles/Text';

const SelectRxButton = styled(ColumnContainer)`
  font-size: 10px;
  width: 300px;
  /* align-items: center;
  align-content: center;
  justify-content: center; */
`;

function SearchListOption(props) {
  const {
    // product_ndc,
    // generic_name,
    active_ingredients,
    index,
    setSelectedDrugIndex,
  } = props;
  // let {
  //   // brand_name
  // } = props;
  // brand_name = brand_name || generic_name;
  // active_ingredients = active_ingredients
  //   .map((ingredient) => (`${ingredient.name} + ${ingredient.strength}`))
  //   .join(' + ');

  return (
    <AlignmentWrapper>
      <RowContainer>
        {/* <div>{product_ndc}</div> */}
        {/* <div>{brand_name}</div> */}
        <SelectRxButton
          // as="button"
          type="button"
          onClick={(e) => { e.preventDefault(); setSelectedDrugIndex(index); }}
        >
          {active_ingredients}
        </SelectRxButton>

      </RowContainer>
    </AlignmentWrapper>
  );
}
SearchListOption.propTypes = {
  // product_ndc: PropTypes.string.isRequired,
  // generic_name: PropTypes.string.isRequired,
  // brand_name: PropTypes.string,
  index: PropTypes.number.isRequired,
  setSelectedDrugIndex: PropTypes.func.isRequired,
  active_ingredients: PropTypes.string.isRequired,
  // dosage_form: PropTypes.string.isRequired,
  // openfda: PropTypes.shape({
  //   rxcui: PropTypes.arrayOf(PropTypes.string),
  // }).isRequired,
};
SearchListOption.defaultProps = {
  // brand_name: null,
};

export default SearchListOption;
