import { Navigate } from "react-router-dom";
import { useAdminMe } from "../api/adminHooks.js";

export function AdminGuard({ children }) {
  const { data, isLoading } = useAdminMe();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-navy text-text-on-dark-muted">جارِ التحقق…</div>;
  }

  if (!data?.authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
