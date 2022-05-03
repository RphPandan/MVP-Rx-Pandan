/* eslint-disable camelcase */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { OverviewRow } from './styles/Overview';
import SearchListOption from './SearchListOption';

const { getDrugsOpenFDA } = require('./controller');

function InputDrugModal() {
  const [searchResultList, setSearchResultList] = useState([]);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [exact] = useState(false);
  const [query, setQuery] = useState('');

  function handleSubmit(e, name) {
    // name, exact = false, limit = 50, skip = 1
    e.preventDefault();
    return getDrugsOpenFDA(name, exact, limit, skip)
      .then((result) => {
        console.log(result.data.results);
        setSearchResultList(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <OverviewRow as="form">
        <input
          id="query"
          type="text"
          placeholder="...input drug name"
          value={query}
          onChange={(e) => { e.preventDefault(); setQuery(e.target.value); }}
        />
        <button
          type="submit"
          onClick={(e) => { handleSubmit(e, query); }}
        >
          Click me to Search
        </button>
        <input
          id="limit"
          type="number"
          value={limit}
          onChange={(e) => { e.preventDefault(); setLimit(e.target.value); }}
        />
      </OverviewRow>
      {searchResultList.map((result) => {
        const {
          product_ndc, generic_name, brand_name, dosage_form,
        } = result;
        let { active_ingredients } = result;
        active_ingredients = active_ingredients
          .map((ingredient) => (`${ingredient.name} + ${ingredient.strength}`))
          .join(' + ');
        return (
          <SearchListOption
            key={product_ndc}
            product_ndc={product_ndc}
            generic_name={generic_name}
            brand_name={brand_name}
            active_ingredients={active_ingredients}
            dosage_form={dosage_form}
            // openfda={openfda}
          />
        );
      })}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); setSkip((prev) => prev - 1); }}
      >
        prev page
      </button>
      <h2>{skip + 1}</h2>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); setSkip((prev) => prev + 1); }}
      >
        next page
      </button>

    </div>
  );
}

InputDrugModal.propTypes = {
  // setSearchResultList: PropTypes.func.isRequired,
  // setRxList: PropTypes.func.isRequired,

};

export default InputDrugModal;
