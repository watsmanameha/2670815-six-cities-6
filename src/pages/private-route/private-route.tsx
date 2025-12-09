import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../types/auth';
import type { RootState } from '../../store';

type PrivateRouteProps = {
  children: ReactElement;
};

// PrivateRoute — обёртка для защищённых маршрутов.
// Если пользователь не авторизован, перенаправляет на /login.
const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
