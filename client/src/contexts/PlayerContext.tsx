import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { Track } from "../types";

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Persist player state to localStorage
  const savePlayerState = (
    track: Track | null,
    time: number,
    playing: boolean,
  ) => {
    const state = {
      track,
      currentTime: time,
      isPlaying: playing,
    };
    localStorage.setItem("playerState", JSON.stringify(state));
  };

  // Load player state from localStorage
  const loadPlayerState = () => {
    const saved = localStorage.getItem("playerState");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.track) {
          setCurrentTrack(state.track);
          // Will resume playback after audio element is ready
          setTimeout(() => {
            if (audioRef.current && state.track) {
              audioRef.current.src = state.track.audioUrl;
              audioRef.current.currentTime = state.currentTime || 0;
              if (state.isPlaying) {
                audioRef.current.play();
                setIsPlaying(true);
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error("Failed to load player state:", error);
        localStorage.removeItem("playerState");
      }
    }
  };

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    // Event listeners
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Periodically save player state
      if (Math.random() < 0.1) {
        // Save ~10% of time updates to avoid excessive writes
        if (currentTrack) {
          savePlayerState(currentTrack, audio.currentTime, isPlaying);
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (currentTrack) {
        savePlayerState(currentTrack, audio.currentTime, isPlaying);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (currentTrack) {
        savePlayerState(currentTrack, 0, false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
    // Load saved player state after audio is initialized
    loadPlayerState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    // If same track, just toggle play
    if (currentTrack?._id === track._id) {
      togglePlay();
      return;
    }

    // Load and play new track
    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
    setCurrentTime(0);
    savePlayerState(track, 0, true);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      savePlayerState(currentTrack, currentTime, false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      savePlayerState(currentTrack, currentTime, true);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setVolumeState(clampedVolume);
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    if (currentTrack) {
      savePlayerState(currentTrack, time, isPlaying);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        currentTime,
        duration,
        playTrack,
        togglePlay,
        pause,
        setVolume,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
