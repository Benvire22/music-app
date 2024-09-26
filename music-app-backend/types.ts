import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface Artist {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string | null;
  description: string | null;
}

export type ArtistMutation = Omit<Artist, '_id'>;

export interface Album {
  _id: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId | string;
  name: string;
  releaseDate: number;
  image: string | null;
}

export type AlbumMutation = Omit<Album, '_id'>;

export interface Track {
  _id: mongoose.Types.ObjectId;
  album: mongoose.Types.ObjectId | string;
  name: string;
  length: string;
  number: number;
}

export type TrackMutation = Omit<Track, '_id'>;

export interface TrackHistoryMutation {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId | string;
  artist: mongoose.Types.ObjectId | string;
  datetime: Date;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;