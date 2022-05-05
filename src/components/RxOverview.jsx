import React, { useState, useEffect } from 'react';
import { OverviewContainer } from './styles/Overview';
import Rxs from './Rxs';
import InputDrugModal from './InputDrugModal';
import RxInteractions from './RxInteractions';
import {
  ColumnContainer,
  MainHeader,
} from './styles/Boxes';
import { MainTitle } from './styles/Text';
import { LeafIcon, RxIcon } from './styles/Icons';

const {
  retrieveRxList, submitRxToList,
  deleteRx, updateRx,
} = require('./controller');

function RxOverview() {
  const [rxList, setRxList] = useState([]);
  const [inputModal, setInputModal] = useState(false);
  const [rxListUpdated, setRxListUpdated] = useState(false);
  const [interactionModal, setInteractionModal] = useState(false);

  useEffect(() => {
    retrieveRxList(setRxList)
      .then((result) => { setRxList(result.data); })
      .catch((err) => { console.log(err); });
  }, [rxListUpdated]);

  const handleRxSubmit = ((rx) => {
    submitRxToList(rx)
      .then(() => { setRxListUpdated((prev) => !prev); })
      .catch(() => {});
  });

  const handleRxDelete = ((rx) => {
    deleteRx(rx)
      .then(() => { setRxListUpdated((prev) => !prev); })
      .catch(() => {});
  });

  const handleAdherenceUpdate = ((rx) => {
    updateRx(rx)
      .then(() => { setRxListUpdated((prev) => !prev); })
      .catch(() => {});
  });

  return (
    <OverviewContainer
      border="true"
    >
      <MainHeader background="primary">
        <MainTitle background="primary" color="secondary">
          <RxIcon />
          <em>Pandan</em>
        </MainTitle>
        <LeafIcon />
      </MainHeader>
      <ColumnContainer>
        {inputModal
          ? (
            <InputDrugModal
              setInputModal={setInputModal}
              setRxList={setRxList}
              inputModal={inputModal}
              handleRxSubmit={handleRxSubmit}
            />
          )
          : null }
        <Rxs
          handleAdherenceUpdate={handleAdherenceUpdate}
          handleRxDelete={handleRxDelete}
          rxList={rxList}
          setInputModal={setInputModal}
        />
        <RxInteractions
          rxList={rxList}
          setInteractionModal={setInteractionModal}
          interactionModal={interactionModal}
        />
      </ColumnContainer>
    </OverviewContainer>
  );
}

RxOverview.propTypes = {};

export default RxOverview;
