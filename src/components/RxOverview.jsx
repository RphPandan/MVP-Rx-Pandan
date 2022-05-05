import React, { useState, useEffect } from 'react';
import { OverviewContainer } from './styles/Overview';
import Rxs from './Rxs';
import InputDrugModal from './InputDrugModal';
import RxInteractions from './RxInteractions';
import {
  RowContainer, ColumnContainer,
  MainHeader, AlignmentWrapper,
} from './styles/Boxes';
import { Title } from './styles/Text';

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
      .then((result) => {
        console.log(result.data);
        setRxList(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rxListUpdated]);

  const handleRxSubmit = ((rx) => {
    submitRxToList(rx)
      .then((result) => {
        console.log(result);
        setRxListUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleRxDelete = ((rx) => {
    deleteRx(rx)
      .then(() => {
        console.log('rx was deleted');
        setRxListUpdated((prev) => !prev);
      })
      .catch(() => {
        console.log('error deleting rx');
      });
  });

  const handleAdherenceUpdate = ((rx) => {
    updateRx(rx)
      .then(() => {
        console.log('rx was updated');
        setRxListUpdated((prev) => !prev);
      })
      .catch(() => {
        console.log('error in updating rx');
      });
  });

  return (
    <OverviewContainer
      border="true"
    >
      <AlignmentWrapper>
        <MainHeader background="primary">
          <Title background="primary" color="secondary"><em>Rx Pandan</em></Title>
        </MainHeader>
      </AlignmentWrapper>
      <ColumnContainer>
        <RowContainer>
          <button
            type="button"
            onClick={() => setInputModal(true)}
          >
            Add new Medication
          </button>
          <button type="button">Navigate to Interactions</button>
        </RowContainer>
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
