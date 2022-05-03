import React, { useState } from 'react';
import { OverviewContainer } from './styles/Overview';
import Rx from './Rx';
import InputDrugModal from './InputDrugModal';

function RxOverview() {
  const [rxList, setRxList] = useState([]);

  return (
    <OverviewContainer border="true">
      <h1>RxOverview</h1>
      <InputDrugModal
        setRxList={setRxList}
      />
      {rxList.map((rx) => <Rx rx={rx} key={rx} />)}
    </OverviewContainer>
  );
}

RxOverview.propTypes = {};

export default RxOverview;
