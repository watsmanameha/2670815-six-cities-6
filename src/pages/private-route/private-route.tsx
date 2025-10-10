import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactElement;
};

// PrivateRoute — обёртка для защищённых маршрутов.
// Если пользователь не авторизован, перенаправляет на /login.
const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
