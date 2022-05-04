import React from 'react';
import RxOverview from './RxOverview';
import RxInteractions from './RxInteractions';
import {
  BigContainer, AppContainer,
} from './styles/Boxes';

function App() {
  return (
    <BigContainer>
      <AppContainer border="true">
        <RxOverview />
        <RxInteractions />
      </AppContainer>
    </BigContainer>

  );
}

export default App;
