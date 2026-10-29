import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Route guard component protecting private views and validating user roles.
 */
export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
