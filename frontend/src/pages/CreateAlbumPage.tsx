import { useState } from "react";
import { musicService } from "../services/music.service";
import { Disc } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  return "Failed to create album";
};

export const CreateAlbumPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await musicService.createAlbum({
        title,
        artist,
        releaseYear: releaseYear ? parseInt(releaseYear) : undefined,
      });

      // Navigate to albums page or show success
      navigate("/albums");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-narrow">
      <h1 className="page-title">Create Album</h1>

      {error && <div className="page-alert page-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="panel-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Album Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="My Album"
            required
          />
        </div>

        {/* Artist */}
        <div className="form-group">
          <label htmlFor="artist" className="form-label">
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

        {/* Release Year */}
        <div className="form-group">
          <label htmlFor="releaseYear" className="form-label">
            Release Year (Optional)
          </label>
          <input
            type="number"
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="form-input"
            placeholder="2024"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="form-button form-button-inline"
        >
          <Disc size={20} />
          {isLoading ? "Creating..." : "Create Album"}
        </button>
      </form>
    </div>
  );
};
