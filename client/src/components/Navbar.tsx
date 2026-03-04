import { LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-spacer"></div>

      {/* User info and logout */}
      <div className="navbar-user-section">
        <div className="navbar-user-info">
          <User size={20} className="navbar-user-avatar" />
          <span>{user?.username}</span>
          {user?.role === "artist" && (
            <span className="navbar-artist-badge">ARTIST</span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="navbar-logout-btn"
          title="Logout"
        >
          <LogOut size={20} className="navbar-logout-icon" />
        </button>
      </div>
    </div>
  );
};
