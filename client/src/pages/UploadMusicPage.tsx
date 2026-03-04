import { useState, useEffect } from "react";
import { musicService } from "../services/music.service";
import { Upload, Music } from "lucide-react";
import type { Album } from "../types";
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
  return "Failed to upload track";
};

export const UploadMusicPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const data = await musicService.getAllAlbums();
      setAlbums(data);
    } catch (err) {
      console.error("Failed to fetch albums:", err);
    }
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setMusicFile(file);
      setError("");
    } else {
      setError("Please select a valid audio file");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicFile) {
      setError("Please select a music file");
      return;
    }

    setError("");
    setSuccess("");
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await musicService.uploadTrack(
        {
          title,
          artist,
          albumId: albumId || undefined,
          music: musicFile,
        },
        setUploadProgress,
      );

      setSuccess("Track uploaded successfully!");
      // Reset form
      setTitle("");
      setArtist("");
      setAlbumId("");
      setMusicFile(null);
      setUploadProgress(0);

      // Reset file inputs
      const musicInput = document.getElementById(
        "music-file",
      ) as HTMLInputElement;
      if (musicInput) musicInput.value = "";
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="page-narrow">
      <h1 className="page-title">Upload Music</h1>

      {error && <div className="page-alert page-alert-error">{error}</div>}

      {success && (
        <div className="page-alert page-alert-success">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="panel-form">
        {/* Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Track Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="My Awesome Song"
            required
          />
        </div>

        {/* Artist */}
        <div className="form-group">
          <label className="form-label" htmlFor="artist">
            Artist Name *
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="form-input"
            placeholder="Artist Name"
            required
          />
        </div>

        {/* Album (optional) */}
        <div className="form-group">
          <label className="form-label" htmlFor="album">
            Album (Optional)
          </label>
          <select
            id="album"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            className="form-select"
          >
            <option value="">No Album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title} - {album.artist}
              </option>
            ))}
          </select>
        </div>

        {/* Music File */}
        <div className="form-group">
          <label className="form-label" htmlFor="music-file">
            Music File * (audio/*)
          </label>
          <div>
            <input
              type="file"
              id="music-file"
              accept="audio/*"
              onChange={handleMusicFileChange}
              className="file-input"
              required
            />
            <label htmlFor="music-file" className="file-picker">
              <Music size={20} />
              <span>{musicFile ? musicFile.name : "Choose audio file..."}</span>
            </label>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="progress-container">
            <div className="progress-meta">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <progress
              className="upload-progress"
              value={uploadProgress}
              max={100}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="form-button form-button-inline"
        >
          <Upload size={20} />
          {isUploading ? "Uploading..." : "Upload Track"}
        </button>
      </form>
    </div>
  );
};
