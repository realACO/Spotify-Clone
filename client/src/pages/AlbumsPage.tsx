import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { musicService } from "../services/music.service";
import type { Album } from "../types";
import { Disc } from "lucide-react";
import "./pages.css";

const getErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }
  return "Failed to load albums";
};

export const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      const data = await musicService.getAllAlbums();
      setAlbums(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="page-loading-text">Loading albums...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        <div className="page-error-text">{error}</div>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="page-empty">
        <div className="text-center">
          <Disc size={64} className="albums-empty-icon" />
          <div className="page-empty-text">No albums available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Albums</h1>

      {/* Albums grid */}
      <div className="page-grid">
        {albums.map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/albums/${album._id}`)}
            className="page-grid-item group"
          >
            <div className="page-grid-media"></div>
            <div className="page-grid-title">{album.title}</div>
            <div className="page-grid-subtitle">{album.artist}</div>
            {album.releaseYear && (
              <div className="page-grid-subtitle">{album.releaseYear}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
