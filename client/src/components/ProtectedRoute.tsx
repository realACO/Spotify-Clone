import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./ProtectedRoute.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="route-loading-screen">
        <div className="route-loading-text">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const ArtistRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isArtist } = useAuth();

  if (isLoading) {
    return (
      <div className="route-loading-screen">
        <div className="route-loading-text">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isArtist()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
