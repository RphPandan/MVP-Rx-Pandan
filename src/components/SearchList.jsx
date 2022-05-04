/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlignmentWrapper } from './styles/Boxes';
import SearchListOption from './SearchListOption';

function SearchList(props) {
  const {
    searchResultList, setSelectedDrugIndex,
    filter, filterChange,
  } = props;
  useEffect(() => {
  }, [filterChange]);
  return (
    <AlignmentWrapper>
      <div>Select current dosage</div>
      {searchResultList
        .sort((a, b) => a.active_ingredients.length - b.active_ingredients.length)
        .map((result, index) => {
          const {
            product_ndc, generic_name, brand_name,
            dosage_form,
            active_ingredients,
          } = result;
          if (filter[dosage_form]) {
            return (
              <SearchListOption
                key={product_ndc}
                index={index}
                product_ndc={product_ndc}
                generic_name={generic_name}
                brand_name={brand_name}
                active_ingredients={active_ingredients}
                setSelectedDrugIndex={setSelectedDrugIndex}
                // dosage_form={dosage_form}
                // openfda={openfda}
              />
            );
          }
          return null;
        })}
    </AlignmentWrapper>
  );
}

SearchList.propTypes = {
  searchResultList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setSelectedDrugIndex: PropTypes.func.isRequired,
  filter: PropTypes.shape(PropTypes.object.isRequired).isRequired,
  filterChange: PropTypes.bool.isRequired,
};

export default SearchList;
