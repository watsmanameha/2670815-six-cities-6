import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../types/auth';
import { selectAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: ReactElement;
};

// PrivateRoute — обёртка для защищённых маршрутов.
// Если пользователь не авторизован, перенаправляет на /login.
const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
