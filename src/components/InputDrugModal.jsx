/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { OverviewRow } from './styles/Overview';
import { ColumnContainer, RowContainer } from './styles/Boxes';
// import SearchListOption from './SearchListOption';
import RxDosageSelector from './RxDosageSelector';
import SearchList from './SearchList';

const ReactDom = require('react-dom');

const ModalBackground = styled(RowContainer)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  opacity: ${(props) => { const opacity = props.isRender ? 1 : 0; return opacity; }};
  transition: opacity 0.6s linear;
`;

const DrugLookupModal = styled(ColumnContainer)`
  /* justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start; */
  position: absolute;
  /* left: 50%;
  top: 200px; */
  top: ${(props) => props.refPos?.top}px;
  left: ${(props) => props.refPos?.left}px;
  /* transform: translate(-50%, -50%); */
  /* left: ${window.innerWidth / 2}px; */
  width: 80em;
  z-index: 2;
  height: 50em;
  opacity: 100%;
  padding: 10px;
  overflow-y: auto;
  /* width: 100%; */
`;

const { getDrugsOpenFDA, filterAndModifyDrugList } = require('./controller');

function InputDrugModal(props) {
  const modalRef = useRef();
  const [searchResultList, setSearchResultList] = useState([]);
  const [limit, setLimit] = useState(500);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState(null);
  const [exact] = useState(false);
  const [total, setTotal] = useState(null);
  const [query, setQuery] = useState('');
  const [dosageForms, setDosageForms] = useState([]);
  const [isRender, setIsRender] = useState(false);
  // const [modalPos, setModalPos] = useState(null);
  const [refPos, setRefPos] = useState(null);

  const { setInputModal, somethingRef } = props;

  useEffect(() => {
    const somethingPos = somethingRef.current?.getBoundingClientRect();
    setRefPos(somethingPos);
  }, [somethingRef]);

  // useEffect(() => {
  //   if (modalRef) {
  //     const ourPos = modalRef.current?.getBoundingClientRect();
  //     setModalPos(ourPos);
  //   }
  // }, [modalRef]);
  useEffect(() => {
    setIsRender(true);
  }, []);

  const handleSubmit = (e, name) => {
    // name, exact = false, limit = 50, skip = 1
    e.preventDefault();
    return getDrugsOpenFDA(name, exact, limit)
      .then((result) => {
        setTotal(result.data.results.length);
        const searchList = filterAndModifyDrugList(result.data.results, setDosageForms);
        setSearchResultList(searchList);
        setQuery('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleFilterButton = (e, name) => {
  //   e.preventDefault();
  //   console.log(name);
  //   const newFilter = filter;
  //   if (newFilter[name]) {
  //     newFilter[name] = false;
  //   } else {
  //     newFilter[name] = true;
  //   }
  //   setFilter(newFilter);
  //   setFilterChange((prev) => !prev);

  //   console.log(newFilter);
  // };

  // useEffect(() => {

  // }, [filter]);
  return ReactDom.createPortal(
    <ModalBackground isRender={isRender}>
      <DrugLookupModal
        // modalPos={modalPos}
        refPos={refPos}
        border="true"
        ref={modalRef}
      >
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setInputModal(false); }}
        >
          close Modal
        </button>
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

};

export default InputDrugModal;
