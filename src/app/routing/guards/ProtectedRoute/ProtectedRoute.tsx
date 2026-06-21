import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@app/providers';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
