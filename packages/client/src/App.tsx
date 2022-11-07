import React, { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';

import App from '@/pages/App';

import './index.less'

const store = setupStore();

function Root() {

  return (
    <StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </StrictMode>
  )
}

export default Root;
