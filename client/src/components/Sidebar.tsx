import { NavLink } from "react-router-dom";
import { Home, Disc, Upload, Plus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Sidebar.css";

export const Sidebar = () => {
  const { isArtist } = useAuth();
  const artist = isArtist();

  const navItems = artist
    ? [
        { name: "Upload", path: "/upload", icon: Upload },
        { name: "Create Album", path: "/create-album", icon: Plus },
      ]
    : [
        { name: "Home", path: "/", icon: Home },
        { name: "Albums", path: "/albums", icon: Disc },
      ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h1>Spotify</h1>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? "active" : ""}`
                }
              >
                <item.icon size={24} className="sidebar-nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
