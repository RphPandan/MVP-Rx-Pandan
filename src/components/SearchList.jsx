/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AlignmentWrapper, RowContainer, ColumnContainer, Button,
} from './styles/Boxes';
import SearchListOption from './SearchListOption';

const styled = require('styled-components/macro');

const FilterButton = styled(Button)`
  border-radius: 12px;
  background-color: ${(props) => { const background = props.filtering ? '#3e3e3e' : '#fffffff0'; return background; }};
  color: ${(props) => { const background = props.filtering ? '#fffffff0' : '#3e3e3e'; return background; }};
`;

const ListFilterRow = styled(RowContainer)`
  justify-content: space-between;
`;

const ListContainer = styled(ColumnContainer)`
  width: 100%;
`;

function SearchList(props) {
  const {
    searchResultList, setSelectedDrugIndex,
    dosageForms,
  } = props;

  const [filter, setFilter] = useState({});
  const [filterChange, setFilterChange] = useState(false);

  useEffect(() => {
  }, [filterChange]);

  const handleFilterButton = (e, name) => {
    e.preventDefault();
    const newFilter = filter;
    if (newFilter[name]) {
      newFilter[name] = false;
    } else {
      newFilter[name] = true;
    }
    setFilter(newFilter);
    setFilterChange((prev) => !prev);
  };

  return (
    <AlignmentWrapper>
      <ListFilterRow>
        <ListContainer>
          <div>Select current dosage</div>
          {searchResultList
            .sort((a, b) => a.active_ingredients.length - b.active_ingredients.length)
            .map((result, index) => {
              const {
                product_ndc, generic_name, brand_name,
                dosage_form,
                active_ingredients, dosage,
              } = result;
              if (filter[dosage_form]) {
                return (
                  <SearchListOption
                    key={product_ndc}
                    index={index}
                    dosage={dosage}
                    dosage_form={dosage_form}
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
        </ListContainer>
        <ColumnContainer>
          {dosageForms.map((formulation) => {
            const { dosageForm, count } = formulation;
            return (
              <FilterButton
                as="button"
                type="button"
                filtering={filter[dosageForm]}
                name={dosageForm}
                onClick={(e) => { handleFilterButton(e, e.target.name); }}
                key={dosageForm}
              >
                {`${dosageForm} `}
                {`${count} results`}
              </FilterButton>
            );
          })}
        </ColumnContainer>
      </ListFilterRow>
    </AlignmentWrapper>
  );
}

SearchList.propTypes = {
  searchResultList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setSelectedDrugIndex: PropTypes.func.isRequired,
  // filter: PropTypes.shape(PropTypes.object.isRequired).isRequired,
  // filterChange: PropTypes.bool.isRequired,
  dosageForms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default SearchList;
