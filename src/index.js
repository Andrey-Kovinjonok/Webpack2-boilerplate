// import Offline from 'offline-plugin/runtime'
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import AppContainer from 'react-hot-loader/lib/AppContainer';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';

import { createClientStore } from './store/index';

import { Header, Home } from './components';
import { Body } from './components/Styled';
import messages from './initMessages';

// Offline.install()

const initialState = {
  storageReducer: {
    data: {
      messages,
    },
  },

  popupReducer: {
    isShowingPopup: false,
  },
};

const store = createClientStore(initialState);

delete AppContainer.prototype.unstable_handleError;

export const Root = () => (
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter>
        <Body>
          <Header />
          <Match exactly pattern="/" component={Home} />
        </Body>
      </BrowserRouter>
    </AppContainer>
  </Provider>
);

if (!module.hot) {
  render(<Root />, document.querySelector('react'));
}
