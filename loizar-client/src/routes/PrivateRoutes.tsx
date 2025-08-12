import type { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import Loading from "../components/loading/Loading";

interface PrivateRoutesProps {
  children: ReactNode;
}

interface CustomUser {
  email: string;
  isBlocked?: boolean;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { user, authLoading } = useAuthStore();

  if (authLoading) return <Loading />;

  if (user && (user as CustomUser).isBlocked)
    return <Navigate to="/blocked" state={{ reach: pathname }} replace />;

  if (user) return <>{children}</>;

  return <Navigate to="/login" state={{ reach: pathname }} replace />;
};

export default PrivateRoutes;
