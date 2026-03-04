import { useEffect, useState } from "react";
import { musicService } from "../services/music.service";
import type { Track } from "../types";
import { usePlayer } from "../contexts/PlayerContext";
import { Play, Pause } from "lucide-react";
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
  return "Failed to load tracks";
};

export const HomePage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      setIsLoading(true);
      const data = await musicService.getAllTracks();
      setTracks(data);
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

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="page-loading-text">Loading tracks...</div>
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

  if (tracks.length === 0) {
    return (
      <div className="page-empty">
        <div className="page-empty-text">No tracks available</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">All Tracks</h1>

      {/* Tracks grid */}
      <div className="page-grid">
        {tracks.map((track) => (
          <div
            key={track._id}
            className="page-grid-item group"
            onClick={() => handlePlayClick(track)}
          >
            <div className="page-grid-media">
              <button
                className="play-btn page-grid-overlay"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {currentTrack?._id === track._id && isPlaying ? (
                  <Pause size={24} className="pause-icon" fill="black" />
                ) : (
                  <Play size={24} className="play-icon" fill="black" />
                )}
              </button>
            </div>
            <div className="page-grid-title">{track.title}</div>
            <div className="page-grid-subtitle">{track.artist}</div>
            {track.albumName && (
              <div className="page-grid-subtitle">{track.albumName}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
