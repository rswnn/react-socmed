import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import Routes from 'routes';

import { store, persistor } from 'store.js';
import './App.css';

const App = () => {

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Routes/>
      </PersistGate>
    </Provider>
  );
};

export default App;
