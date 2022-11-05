import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children: any;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/home',
  children,
}: ProtectedRouteProps): any => {

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
