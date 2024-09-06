import mongoose from 'mongoose';

export interface UserField {
  username: string;
  password: string;
  token: string;
}

export interface Artist {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string | null;
  description: string;
}

export type ArtistMutation = Omit<Artist, '_id'>;

export interface Album {
  _id: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId | string;
  name: string;
  releaseDate: string;
  image: string | null;
}

export type AlbumMutation = Omit<Album, '_id'>;

export interface Track {
  _id: mongoose.Types.ObjectId;
  album: mongoose.Types.ObjectId | string;
  name: string;
  length: string;
}

export type TrackMutation = Omit<Track, '_id'>;

export interface TrackHistoryMutation {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId | string;
  datetime: Date;
}