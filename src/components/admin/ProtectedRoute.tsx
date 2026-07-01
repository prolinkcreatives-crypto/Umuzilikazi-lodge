import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, initializing } = useAuthStore();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-beige">
        <p className="label-caps text-on-surface-variant">Checking session…</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
