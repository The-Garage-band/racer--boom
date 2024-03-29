import { Navigate, Outlet } from 'react-router-dom'
import Loader from '@/pages/Loader'
import {ReactElement} from "react";

interface ProtectedRouteProps {
  isAllowed: boolean
  isLoading: boolean
  redirectPath: string
  children?: ReactElement
}

const ProtectedRoute = ({
  isAllowed,
  isLoading,
  redirectPath = '/home',
  children,
}: ProtectedRouteProps): ReactElement => {
  if (isLoading) {
    return <Loader />
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
