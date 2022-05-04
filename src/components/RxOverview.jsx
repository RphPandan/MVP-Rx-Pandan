import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { OverviewContainer } from './styles/Overview';
import Rxs from './Rxs';
import InputDrugModal from './InputDrugModal';
import RxInteractions from './RxInteractions';
import { RowContainer, ColumnContainer } from './styles/Boxes';
import { Title, Text } from './styles/Text';

const Header = styled(RowContainer)`
  height: 7em;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Something = styled(ColumnContainer)`
  width: 100%;
  height: 2em;
`;

const { retrieveRxList } = require('./controller');

function RxOverview() {
  const [rxList, setRxList] = useState([]);
  const [inputModal, setInputModal] = useState(false);
  const somethingRef = useRef();

  useEffect(() => {
    retrieveRxList(setRxList);
  }, []);

  return (
    <OverviewContainer border="true">
      <Header>
        <ColumnContainer>
          <Title>
            Rx Pandan
          </Title>
          <Text> @RphPandan</Text>
        </ColumnContainer>
      </Header>
      <Something
        ref={somethingRef}
        border="true"
      />
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
              somethingRef={somethingRef}
              setInputModal={setInputModal}
              setRxList={setRxList}
              inputModal={inputModal}
            />
          )
          : null }
        <Rxs rxList={rxList} />
        <RxInteractions />
      </ColumnContainer>
    </OverviewContainer>
  );
}

RxOverview.propTypes = {};

export default RxOverview;
