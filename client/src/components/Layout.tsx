import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Player } from "./Player";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="layout-container">
      <div className="layout-content-wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="layout-main">
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <main className="layout-page-content">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Player */}
      <Player />
    </div>
  );
};
