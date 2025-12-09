import type { FC } from 'react';
import { useEffect } from 'react';
import type { AppProps } from './types';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { fetchOffers, checkAuth } from '../../store/action';
import { AppDispatch } from '../../store';

const AppContent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainScreen />}
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

const App: FC<AppProps> = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
