import mongoose from 'mongoose';
import {ArtistModel, ArtistMutation} from '../types';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema<ArtistMutation, ArtistModel>({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  description: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model<ArtistMutation, ArtistModel>('Artist', ArtistSchema);
export default Artist;
