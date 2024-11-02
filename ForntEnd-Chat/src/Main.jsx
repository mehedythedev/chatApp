
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App from './App.jsx'
import {persistStore} from "redux-persist"

import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import {Toaster} from "react-hot-toast"

import { Provider } from 'react-redux';
import { StrictMode } from 'react';

let persistor = persistStore(store);

export const BASE_URL="http://localhost:8080"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster/>
      </PersistGate>
    </Provider>
  </StrictMode>
);