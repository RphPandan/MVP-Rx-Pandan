/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { OverviewRow } from './styles/Overview';
import { Button } from './styles/Boxes';
// import SearchListOption from './SearchListOption';
import RxDosageSelector from './RxDosageSelector';
import SearchList from './SearchList';

const { getDrugsOpenFDA, filterAndModifyDrugList } = require('./controller');

function InputDrugModal() {
  const [searchResultList, setSearchResultList] = useState([]);
  const [limit, setLimit] = useState(500);
  // const [skip, setSkip] = useState(0);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState(null);
  const [exact] = useState(false);
  const [total, setTotal] = useState(null);
  const [query, setQuery] = useState('');
  const [dosageForms, setDosageForms] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterChange, setFilterChange] = useState(false);

  const handleSubmit = (e, name) => {
    // name, exact = false, limit = 50, skip = 1
    e.preventDefault();
    return getDrugsOpenFDA(name, exact, limit)
      .then((result) => {
        setTotal(result.data.results.length);
        const searchList = filterAndModifyDrugList(result.data.results, setDosageForms);
        setSearchResultList(searchList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterButton = (e, name) => {
    e.preventDefault();
    console.log(name);
    const newFilter = filter;
    if (newFilter[name]) {
      newFilter[name] = false;
    } else {
      newFilter[name] = true;
    }
    setFilter(newFilter);
    setFilterChange((prev) => !prev);

    console.log(newFilter);
  };

  useEffect(() => {

  }, [filter]);

  return (
    <div>
      <OverviewRow as="form" columnGap="20px">
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
          placeholder="...defaults to 500"
          onChange={(e) => { e.preventDefault(); setLimit(e.target.value); }}
        />
        <div>{`${total} results back`}</div>
      </OverviewRow>
      {selectedDrugIndex === null ? dosageForms.map((formulation) => {
        const { dosageForm, count } = formulation;
        return (
          <Button
            as="button"
            type="button"
            name={dosageForm}
            onClick={(e) => { handleFilterButton(e, e.target.name); }}
            key={dosageForm}
          >
            {`${dosageForm} `}
            {`${count} results`}
          </Button>
        );
      }) : null}
      {selectedDrugIndex !== null
        ? (
          <RxDosageSelector
            drug={searchResultList[selectedDrugIndex]}
            setSelectedDrugIndex={setSelectedDrugIndex}
          />
        )
        : null}
      {searchResultList.length > 0 && selectedDrugIndex === null
        ? (
          <SearchList
            filterChange={filterChange}
            filter={filter}
            searchResultList={searchResultList}
            setSelectedDrugIndex={setSelectedDrugIndex}
          />
        )
        : null}
      {/* <button
        type="button"
        onClick={(e) => { e.preventDefault(); setSkip(limit > 0 ? limit - 1 : null); }}
      >
        prev page
      </button>
      <h2>{skip + 1}</h2>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSkip(searchResultList.length > 0 ? limit + 1 : null);
        }}
      >
        next page
      </button> */}

    </div>
  );
}

InputDrugModal.propTypes = {
  // setSearchResultList: PropTypes.func.isRequired,
  // setRxList: PropTypes.func.isRequired,

};

export default InputDrugModal;
