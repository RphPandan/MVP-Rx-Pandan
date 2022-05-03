/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';

function SearchListOption(props) {
  const {
    // product_ndc,
    generic_name,
  } = props;
  let { active_ingredients, brand_name } = props;
  brand_name = brand_name || generic_name;
  active_ingredients = active_ingredients
    .map((ingredient) => (`${ingredient.name} + ${ingredient.strength}`))
    .join(' + ');

  return (
    <>
      {/* <div>{product_ndc}</div> */}
      <div>{brand_name}</div>
      <div>{active_ingredients}</div>
      <div>--------------------------------------</div>

    </>
  );
}
SearchListOption.propTypes = {
  // product_ndc: PropTypes.string.isRequired,
  generic_name: PropTypes.string.isRequired,
  brand_name: PropTypes.string,
  active_ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  // openfda: PropTypes.shape({
  //   rxcui: PropTypes.arrayOf(PropTypes.string),
  // }).isRequired,
};
SearchListOption.defaultProps = {
  brand_name: null,
};

export default SearchListOption;
