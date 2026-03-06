import axiosClient from "../api/axios";
import type { Track, Album, UploadMusicData, CreateAlbumData } from "../types";

type BackendArtist = {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
};

type BackendMusic = {
  _id?: string;
  id?: string;
  title?: string;
  uri?: string;
  audioUrl?: string;
  artist?: string | BackendArtist;
  createdAt?: string;
};

type BackendAlbum = {
  _id?: string;
  id?: string;
  title?: string;
  artist?: string | BackendArtist;
  musics?: BackendMusic[];
  tracks?: BackendMusic[];
  imageUrl?: string;
  releaseYear?: number;
  createdAt?: string;
};

const resolveArtistName = (artist: BackendMusic["artist"]): string => {
  if (typeof artist === "string") {
    return artist;
  }
  return artist?.username || "Unknown Artist";
};

const resolveArtistId = (
  artist: BackendMusic["artist"],
): string | undefined => {
  if (typeof artist === "string") {
    return undefined;
  }
  return artist?._id || artist?.id;
};

const mapTrack = (track: BackendMusic): Track => {
  return {
    _id: track._id || track.id || "",
    title: track.title || "Untitled",
    artist: resolveArtistName(track.artist),
    artistId: resolveArtistId(track.artist),
    audioUrl: track.audioUrl || track.uri || "",
    uri: track.uri,
    createdAt: track.createdAt,
  };
};

const mapAlbum = (album: BackendAlbum): Album => {
  const artistName = resolveArtistName(album.artist);
  const artistId = resolveArtistId(album.artist);
  const sourceTracks = album.tracks || album.musics || [];

  return {
    _id: album._id || album.id || "",
    title: album.title || "Untitled Album",
    artist: artistName,
    artistId,
    imageUrl: album.imageUrl,
    releaseYear: album.releaseYear,
    tracks: sourceTracks.map(mapTrack),
    musics: sourceTracks.map(mapTrack),
    createdAt: album.createdAt,
  };
};

export const musicService = {
  // Get all music tracks
  getAllTracks: async (): Promise<Track[]> => {
    const response = await axiosClient.get<{ musics: BackendMusic[] }>(
      "/music/",
    );
    return (response.data?.musics || []).map(mapTrack);
  },

  // Get all albums
  getAllAlbums: async (): Promise<Album[]> => {
    const response = await axiosClient.get<{ albums: BackendAlbum[] }>(
      "/music/albums",
    );
    return (response.data?.albums || []).map(mapAlbum);
  },

  // Get album by ID
  getAlbumById: async (id: string): Promise<Album> => {
    const response = await axiosClient.get<{ album: BackendAlbum }>(
      `/music/albums/${id}`,
    );
    return mapAlbum(response.data.album);
  },

  // Upload music track (Artist only)
  uploadTrack: async (
    data: UploadMusicData,
    onUploadProgress?: (progress: number) => void,
  ): Promise<Track> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("music", data.music);

    const response = await axiosClient.post<{ music: BackendMusic }>(
      "/music/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onUploadProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            onUploadProgress(percentCompleted);
          }
        },
      },
    );
    return mapTrack(response.data.music);
  },

  // Create album (Artist only)
  createAlbum: async (data: CreateAlbumData): Promise<Album> => {
    const payload = {
      title: data.title,
      musics: [],
    };
    const response = await axiosClient.post<{ album: BackendAlbum }>(
      "/music/album",
      payload,
    );
    return mapAlbum(response.data.album);
  },
};
