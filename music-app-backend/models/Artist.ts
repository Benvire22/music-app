import mongoose from 'mongoose';
import { ArtistMutation } from '../types';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema<ArtistMutation>({
  name: {
    type: String,
    required: true,
  },
  photo: String,
  description: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;
