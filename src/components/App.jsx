import React from 'react';
import RxOverview from './RxOverview';
import RxInteractions from './RxInteractions';
import {
  BigContainer, Header, AppContainer,
} from './styles/Boxes';

function App() {
  return (
    <BigContainer>
      <AppContainer border="true">
        <Header>
          hello World
        </Header>
        <RxOverview />
        <RxInteractions />
      </AppContainer>
    </BigContainer>

  );
}

export default App;
