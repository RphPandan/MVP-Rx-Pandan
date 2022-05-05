/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { OverviewRow } from './styles/Overview';
import {
  ColumnContainer, CloseButton,
  Button, ModalBackground,
} from './styles/Boxes';

// import SearchListOption from './SearchListOption';
import RxDosageSelector from './RxDosageSelector';
import SearchList from './SearchList';
import { DrugInput, LimitInput } from './styles/Forms';
// import { Title2 } from './styles/Text';

const ReactDom = require('react-dom');

const DrugLookupModal = styled(ColumnContainer)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 20%);
  border-radius: 12px;
  width: 60em;
  z-index: 2;
  height: 50em;
  opacity: 100%;
  padding: 10px;
  overflow-y: auto;
`;

const SearchButton = styled(Button)`
  height: 30px;
`;

const { getDrugsOpenFDA, filterAndModifyDrugList } = require('./controller');

function InputDrugModal(props) {
  const modalRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [limit, setLimit] = useState(500);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState(null);
  const [exact] = useState(false);
  const [query, setQuery] = useState('');
  const [dosageForms, setDosageForms] = useState([]);
  const [isRender, setIsRender] = useState(false);

  const {
    setInputModal,
    handleRxSubmit, medListHeaderRef,
  } = props;

  useEffect(() => {
  }, [medListHeaderRef]);

  useEffect(() => {
    setIsRender(true);
  }, []);

  const handleSubmit = (e, name) => {
    e.preventDefault();
    getDrugsOpenFDA(name, exact, limit)
      .then((result) => {
        const searchList = filterAndModifyDrugList(result.data.results, setDosageForms);
        setSearchResultList(searchList);
        setQuery('');
        setSelectedDrugIndex(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return ReactDom.createPortal(
    <ModalBackground isRender={isRender}>
      <DrugLookupModal
        // modalPos={modalPos}
        background="secondary"
        border="true"
        ref={modalRef}
      >
        <OverviewRow as="form" columnGap="20px">
          <DrugInput
            id="query"
            type="text"
            placeholder="...input drug name"
            value={query}
            required
            onChange={(e) => { e.preventDefault(); setQuery(e.target.value); }}
          />
          <SearchButton
            type="submit"
            onClick={(e) => { handleSubmit(e, query); }}
          >
            Search OpenFda
          </SearchButton>

          <LimitInput
            id="limit"
            type="number"
            value={limit}
            placeholder="...defaults to 500"
            onChange={(e) => { e.preventDefault(); setLimit(e.target.value); }}
          />
          <CloseButton
            type="button"
            onClick={(e) => { e.preventDefault(); setInputModal(false); }}
          >
            X
          </CloseButton>
        </OverviewRow>
        {selectedDrugIndex !== null
          ? (
            <RxDosageSelector
              setInputModal={setInputModal}
              handleRxSubmit={handleRxSubmit}
              drug={searchResultList[selectedDrugIndex]}
              setSelectedDrugIndex={setSelectedDrugIndex}
            />
          )
          : null}
        {searchResultList.length > 0 && selectedDrugIndex === null
          ? (
            <SearchList
              dosageForms={dosageForms}
              searchResultList={searchResultList}
              setSelectedDrugIndex={setSelectedDrugIndex}
            />
          )
          : null}
      </DrugLookupModal>
    </ModalBackground>,
    document.getElementById('portal'),
  );
}

InputDrugModal.propTypes = {
  // setSearchResultList: PropTypes.func.isRequired,
  // setRxList: PropTypes.func.isRequired,
  setInputModal: PropTypes.func.isRequired,
  handleRxSubmit: PropTypes.func.isRequired,
};

export default InputDrugModal;
