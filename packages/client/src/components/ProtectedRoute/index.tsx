import { Navigate, Outlet } from 'react-router-dom';
import Loader from "@/pages/Loader";

interface ProtectedRouteProps {
  isAllowed: boolean;
  isLoading: boolean;
  redirectPath: string;
  children?: any;
}

const ProtectedRoute = ({
  isAllowed,
  isLoading,
  redirectPath = '/home',
  children,
}: ProtectedRouteProps): any => {

  if (isLoading) {
    return <Loader />;
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
