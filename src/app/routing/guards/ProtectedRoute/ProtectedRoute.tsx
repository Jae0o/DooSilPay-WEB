import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@app/providers';
import { useGetAcademyQuery } from '@entities/academy';

const ONBOARDING_PATH = '/onboarding/academy';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const { data: academy, isPending: academyPending } = useGetAcademyQuery({ enabled: !!user });

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (academyPending) return null;

  if (academy === null && pathname !== ONBOARDING_PATH) {
    return <Navigate to={ONBOARDING_PATH} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
