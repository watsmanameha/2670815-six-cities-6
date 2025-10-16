import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/app';
import { OFFERS } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const OFFERS_COUNT = OFFERS.length; // данные для главной страницы (from mocks)

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT} offers={OFFERS} />
  </React.StrictMode>,
);
