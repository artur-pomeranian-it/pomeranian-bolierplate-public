import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App';
import { store } from './App/Store';
import { worker } from './App/Mocks/setupWorker';

// import { server } from './App/Mocks/setupServer';

// if (process.env.NODE_ENV === 'development') {
worker.start({
  onUnhandledRequest: 'bypass',
});

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// }
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
