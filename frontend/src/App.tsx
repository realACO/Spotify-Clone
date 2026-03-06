import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import { ProtectedRoute, ArtistRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { AlbumsPage } from "./pages/AlbumsPage";
import { AlbumDetailsPage } from "./pages/AlbumDetailsPage";
import { UploadMusicPage } from "./pages/UploadMusicPage";
import { CreateAlbumPage } from "./pages/CreateAlbumPage";
import { useAuth } from "./contexts/AuthContext";

const RoleHomeRedirect = () => {
  const { user } = useAuth();

  if (user?.role === "artist") {
    return <Navigate to="/upload" replace />;
  }

  return <HomePage />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<RoleHomeRedirect />} />
              <Route path="albums" element={<AlbumsPage />} />
              <Route path="albums/:id" element={<AlbumDetailsPage />} />

              {/* Artist-only routes */}
              <Route
                path="upload"
                element={
                  <ArtistRoute>
                    <UploadMusicPage />
                  </ArtistRoute>
                }
              />
              <Route
                path="create-album"
                element={
                  <ArtistRoute>
                    <CreateAlbumPage />
                  </ArtistRoute>
                }
              />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
