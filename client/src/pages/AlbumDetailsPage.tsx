import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { musicService } from "../services/music.service";
import type { Album, Track } from "../types";
import { usePlayer } from "../contexts/PlayerContext";
import { ArrowLeft, Pause, Clock } from "lucide-react";
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
  return "Failed to load album";
};

export const AlbumDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    if (id) {
      fetchAlbum(id);
    }
  }, [id]);

  const fetchAlbum = async (albumId: string) => {
    try {
      setIsLoading(true);
      const data = await musicService.getAlbumById(albumId);
      setAlbum(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayClick = (track: Track) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="page-loading-text">Loading album...</div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="page-error">
        <div className="page-error-text">{error || "Album not found"}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Back button */}
      <button onClick={() => navigate("/albums")} className="album-back-button">
        <ArrowLeft size={20} />
        <span>Back to Albums</span>
      </button>

      {/* Album header */}
      <div className="album-header">
        <div className="album-info">
          <p className="album-type-label">ALBUM</p>
          <h1>{album.title}</h1>
          <div className="album-meta">
            <span className="album-meta-artist">{album.artist}</span>
            {album.releaseYear && <span>• {album.releaseYear}</span>}
            {album.tracks && <span>• {album.tracks.length} songs</span>}
          </div>
        </div>
      </div>

      {/* Tracks list */}
      <div className="album-tracks-panel">
        <div className="album-tracks-header">
          <div className="album-col-index">#</div>
          <div>TITLE</div>
          <div className="album-col-duration">
            <Clock size={16} className="album-clock-icon" />
          </div>
        </div>

        {album.tracks && album.tracks.length > 0 ? (
          <ul className="tracks-list">
            {album.tracks.map((track, index) => (
              <li
                key={track._id}
                onClick={() => handlePlayClick(track)}
                className={`track-item album-track-row ${currentTrack?._id === track._id ? "active" : ""}`}
              >
                <div className="album-track-index">
                  {currentTrack?._id === track._id && isPlaying ? (
                    <Pause size={16} className="album-track-active-icon" />
                  ) : (
                    <>
                      <span>{index + 1}</span>
                    </>
                  )}
                </div>
                <div>
                  <div
                    className={`album-track-title ${currentTrack?._id === track._id ? "active" : ""}`}
                  >
                    {track.title}
                  </div>
                  <div className="album-track-subtitle">{track.artist}</div>
                </div>
                <div className="album-track-duration">
                  {formatDuration(track.duration)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="album-empty-tracks">No tracks in this album</div>
        )}
      </div>
    </div>
  );
};
