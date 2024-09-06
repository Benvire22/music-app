import mongoose, { Types } from 'mongoose';
import Artist from './Artist';
import { AlbumMutation } from '../types';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema<AlbumMutation>({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist not found',
    },
  },
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;
