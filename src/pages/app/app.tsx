import type { FC } from 'react';
import MainScreen from '../main-screen/main-screen';
import LoginScreen from '../login-screen/login-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
};

// App – корневой компонент приложения. Пока рендерит только главную страницу.
const App: FC<AppProps> = ({ offersCount }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen offersCount={offersCount} />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute isAuthorized={false}>
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </BrowserRouter>
);

export default App;
