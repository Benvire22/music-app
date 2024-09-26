import mongoose, { Types } from 'mongoose';
import Artist from './Artist';
import {AlbumModel, AlbumMutation} from '../types';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema<AlbumMutation, AlbumModel>({
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
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Album = mongoose.model<AlbumMutation, AlbumModel>('Album', AlbumSchema);
export default Album;
