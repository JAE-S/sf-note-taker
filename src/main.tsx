// React Core Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
// Redux Core Imports
import { Provider } from 'react-redux';
import { store } from './store';
// Local - App Imports
import App from './App';
// Local - Styling Imports
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
