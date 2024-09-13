
export interface Artist {
  _id: string;
  name: string;
  photo: string | null;
  description: string;
}

export interface Album {
  _id: string;
  name: string;
  releaseDate: number;
  image: string | null;
}

export interface Track {
  _id: string;
  album: string;
  name: string;
  length: string;
  number: number;
}