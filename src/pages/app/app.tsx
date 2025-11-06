import type { FC } from 'react';
import type { AppProps } from './types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

const App: FC<AppProps> = ({ store, offers }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainScreen offers={offers} />}
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized={false}>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
