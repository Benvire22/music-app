
export interface Artist {
  _id: string;
  name: string;
  photo: string | null;
  description: string;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
  description: string;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
  };
  name: string;
  releaseDate: number;
  image: string | null;
  isPublished: boolean;
}

export interface AlbumMutation {
  artist: string
  name: string;
  releaseDate: string;
  image: File | null;
}

export interface Track {
  _id: string;
  album: string;
  name: string;
  length: string;
  number: number;
}

export interface TrackHistory {
  _id: string;
  track: Track;
  artist: {
    _id: string;
    name: string;
  }
  datetime: Date;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}