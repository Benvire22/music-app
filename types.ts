import mongoose from "mongoose";

export interface Artist {
    _id: mongoose.Types.ObjectId;
    name: string;
    photo: string | null;
    description: string;
}
export type ArtistMutation = Omit<Artist, '_id'>;