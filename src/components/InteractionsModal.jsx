/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable function-paren-newline */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import {
  ColumnContainer, CloseButton, Button, RowContainer,
  ModalBackground, Header, HeaderRow,
} from './styles/Boxes';

import { Select } from './styles/Forms';
import Interactions from './Interactions';

const ReactDom = require('react-dom');

const { getInteractions } = require('./controller');

const Disclaimer = styled.p`
  width: 1100px;
  background: #ffff1b;
`;

const InteractionBottomHeaderRow = styled(RowContainer)`
  justify-content: space-between;
  column-gap: 10px;
  align-items: center;
  border-radius: 12px;
  padding: 10px;
`;

const InteractionTopHeaderRow = styled(HeaderRow)`
  padding: 10px;
`;

const InteractionButton = styled(Button)`
  font-size: 12px;
  max-width: 200px;
  text-align: start;
  height: 80px;
  overflow-wrap: break-word;
`;

const DrugInteractionsModal = styled(ColumnContainer)`
  /* justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start; */
  position: absolute;
  /* left: 50%;
  top: 200px; */
  left: 50%;
  border-radius: 12px;
  transform: translate(-50%, 20%);
  /* left: ${window.innerWidth / 2}px; */
  width: 70em;
  z-index: 2;
  height: 50em;
  opacity: 100%;
  padding: 10px;
  overflow-y: auto;
  row-gap: 10px;
  /* width: 100%; */
`;

const DrugSelect = styled(Select)`
  height: 50px;
  width: 20%;
  font-size: 16px;
  margin: 0 10px 0 0 ;
  border-radius: 12px;
  text-align: center;
  text-align-last: center;
`;

const InteractionDrugsRow = styled(RowContainer)`
  column-gap:10px;
  padding: 10px;
  border-radius: 12px;
  row-gap: 10px;
`;

const DrugRow = styled(RowContainer)`
  row-gap: 10px;
  column-gap:10px;
  flex-wrap: wrap;
`;

const SelectAllButton = styled(Button)`
  height: 50px;
`;

const CheckInteractionButton = styled(SelectAllButton)`
  width: 200px;
`;

const DrugOption = styled.option`
  align-items: center;
  text-align: left;
`;

function InteractionsModal(props) {
  const {
    rxList, setInteractionModal,
  } = props;
  const [interactionList, setInteractionList] = useState(
    [...Array(rxList.length).keys()].map(() => false));
  const [isRender, setIsRender] = useState(false);
  const [interactionListUpdate, setInteractionListUpdate] = useState(false);
  const [interactions, setInteractions] = useState(null);
  const [interactionsJSON, setInteractionsJSON] = useState('');
  useEffect(() => {
    setIsRender(true);
  }, [interactionListUpdate]);

  const checkInteractions = async (e) => {
    if (e) { e.preventDefault(); }
    const rxcuis = interactionList.filter((x) => x)
      .map((drug) => drug.rxcui[0])
      .join('+');

    getInteractions(rxcuis)
      .then((result) => {
        console.log(result.data);
        setInteractions(result.data);
        setInteractionsJSON(JSON.stringify(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addAllDrugsToList = async (e) => {
    e.preventDefault();
    await setInteractionList(rxList);
    await setInteractionListUpdate((prev) => !prev);
  };

  const addToInteractionList = async (e) => {
    e.preventDefault();
    const index = e.target.value;
    const updatedList = interactionList;
    updatedList[index] = rxList[index];
    await setInteractionList(updatedList);
    setInteractionListUpdate((prev) => !prev);
  };

  const removeDrugFromList = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const updatedList = interactionList.map((drug) => {
      if (drug._id === e.target.value) {
        return false;
      }
      return drug;
    });
    await setInteractionList(updatedList);
    setInteractionListUpdate((prev) => !prev);
  };

  return ReactDom.createPortal(
    <ModalBackground isRender={isRender}>
      <DrugInteractionsModal>
        <CloseButton
          onClick={(e) => { e.preventDefault(); setInteractionModal(false); }}
        >
          X
        </CloseButton>
        <Header> Interaction Checker - NLM</Header>
        <InteractionTopHeaderRow>
          <h2>Choose medication to look up interactions for</h2>
          <SelectAllButton
            type="button"
            onClick={(e) => { addAllDrugsToList(e); }}
          >
            Check For All Interactions Possible
          </SelectAllButton>
          <DrugSelect
            defaultValue="DEFAULT"
            onChange={(e) => { addToInteractionList(e); }}
          >
            <DrugOption value="DEFAULT" disabled>Select an Option</DrugOption>
            {rxList.map((rx, index) => {
              const { _id, display_name } = rx;
              // let { active_ingredients } = rx;
              // if (active_ingredients.length > 35) {
              //   active_ingredients = `${active_ingredients.slice(0, 35)}...`;
              // }
              return (
                <DrugOption
                  key={_id}
                  value={index}
                >
                  {display_name}
                </DrugOption>
              );
            })}
          </DrugSelect>
        </InteractionTopHeaderRow>
        <InteractionDrugsRow>
          <ColumnContainer>
            <h3>Checking Interactions for </h3>
          </ColumnContainer>
          <DrugRow>
            {interactionList.map((iRx) => {
              if (iRx) {
                const { _id, display_name, dosage_form } = iRx;
                // if (active_ingredients.length > 50) {
                //   active_ingredients = `${active_ingredients.slice(0, 50)}...`;
                // }
                return (
                  <InteractionButton
                    key={_id}
                    value={_id}
                    onClick={(e) => { removeDrugFromList(e); }}
                  >
                    <b>{`${display_name} ${dosage_form}`}</b>
                  </InteractionButton>
                );
              } return null;
            })}
          </DrugRow>
        </InteractionDrugsRow>
        <InteractionBottomHeaderRow>

          <CheckInteractionButton
            type="button"
            onClick={(e) => { checkInteractions(e); }}
          >
            Check Interactions
          </CheckInteractionButton>
          {interactions
            ? (
              <Disclaimer><b>{`Disclaimer - ${interactions.nlmDisclaimer}`}</b></Disclaimer>
            )
            : null}
        </InteractionBottomHeaderRow>
        {interactions
          ? (
            <Interactions
              interactions={interactions}
              interactionsJSON={interactionsJSON}
            />
          )
          : null}
      </DrugInteractionsModal>
    </ModalBackground>, document.getElementById('portal2'));
}

InteractionsModal.propTypes = {
  rxList: PropTypes.array.isRequired,
  setInteractionModal: PropTypes.func.isRequired,
};

export default InteractionsModal;
