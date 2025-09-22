import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const OFFERS_COUNT = 5; // данные для главной страницы

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT} />
  </React.StrictMode>,
);
