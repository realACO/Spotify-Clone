import { usePlayer } from "../contexts/PlayerContext";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import "./Player.css";

export const Player = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    currentTime,
    duration,
    seek,
  } = usePlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="player">
      {/* Track info */}
      <div className="player-track-info">
        <div className="player-track-details">
          <div className="player-track-title">{currentTrack.title}</div>
          <div className="player-track-artist">{currentTrack.artist}</div>
        </div>
      </div>

      {/* Player controls */}
      <div className="player-controls">
        {/* Play/Pause button */}
        <button onClick={togglePlay} className="player-play-btn">
          {isPlaying ? (
            <Pause size={20} className="player-pause-icon" fill="black" />
          ) : (
            <Play size={20} className="player-play-icon" fill="black" />
          )}
        </button>

        {/* Progress bar */}
        <div className="player-progress">
          <span className="player-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="player-progress-bar slider"
          />
          <span className="player-time player-time-end">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume control */}
      <div className="player-volume">
        <button onClick={toggleMute} className="player-volume-btn">
          {isMuted || volume === 0 ? (
            <VolumeX size={20} className="player-volume-icon" />
          ) : (
            <Volume2 size={20} className="player-volume-icon" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="player-volume-slider slider"
        />
      </div>
    </div>
  );
};
