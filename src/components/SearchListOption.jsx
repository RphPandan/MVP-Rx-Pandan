/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/macro';
import { ColumnContainer, AlignmentWrapper } from './styles/Boxes';
// import Text from './styles/Text';

const SelectRxButton = styled(ColumnContainer)`
  width: 35%;
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
  /* border-radius: 12px; */
  padding: 5px;
  border-radius: 10px;
  /* align-items: center;
  align-content: center;
  justify-content: center; */
`;

const DrugText = styled.p`
  margin: 0px;
  row-gap: 0px;
  font-size: ${(props) => { const size = props.font_size ? props.font_size : '12px'; return size; }};
  font-weight: ${(props) => { const weight = props.font_weight ? props.font_weight : 'normal'; return weight; }};
`;

function SearchListOption(props) {
  const {
    // product_ndc,
    // generic_name,
    // brand_name,
    active_ingredients,
    dosage,
    index,
    setSelectedDrugIndex,
  } = props;
  // const isBrand = brand_name.toLowerCase() === generic_name.toLowerCase();
  // let {
  //   // brand_name
  // } = props;
  // brand_name = brand_name || generic_name;
  // active_ingredients = active_ingredients
  //   .map((ingredient) => (`${ingredient.name} + ${ingredient.strength}`))
  //   .join(' + ');

  return (
    <AlignmentWrapper>
      <SelectRxButton
        // as="button"
        border="true"
        type="button"
        onClick={(e) => { e.preventDefault(); setSelectedDrugIndex(index); }}
      >
        {/* {!isBrand ? <DrugText
          font-size={!isBrand}><b>{`${brand_name}**`}</b></DrugText> : null} */}
        <DrugText font_size="14px" font_weight="600">
          {active_ingredients}
        </DrugText>
        <DrugText>
          {dosage}
        </DrugText>
      </SelectRxButton>
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
  dosage: PropTypes.string.isRequired,
  // brand_name: PropTypes.string.isRequired,
  // generic_name: PropTypes.string.isRequired,
  // dosage_form: PropTypes.string.isRequired,
  // openfda: PropTypes.shape({
  //   rxcui: PropTypes.arrayOf(PropTypes.string),
  // }).isRequired,
};
SearchListOption.defaultProps = {
  // brand_name: null,
};

export default SearchListOption;
