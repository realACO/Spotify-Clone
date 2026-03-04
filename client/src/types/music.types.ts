export interface Track {
  _id: string;
  title: string;
  artist: string;
  artistId?: string;
  albumId?: string;
  albumName?: string;
  duration?: number;
  audioUrl: string;
  uri?: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  artistId?: string;
  imageUrl?: string;
  releaseYear?: number;
  musics?: Track[];
  tracks?: Track[];
  createdAt?: string;
}

export interface UploadMusicData {
  title: string;
  artist: string;
  albumId?: string;
  music: File;
  image?: File;
}

export interface CreateAlbumData {
  title: string;
  artist: string;
  imageUrl?: string;
  releaseYear?: number;
}
