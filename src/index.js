import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App';
import { store } from './App/Store';
// import { worker } from './App/Mocks/setupWorker';
import app from './firebase';

if (process.env.NODE_ENV === 'development') {
  // worker.start();
}
console.log('Firebase App Name: ', app.name);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
