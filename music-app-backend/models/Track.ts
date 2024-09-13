import mongoose, { Types } from 'mongoose';
import Album from './Album';
import { TrackMutation } from '../types';

const Schema = mongoose.Schema;

const TrackSchema = new Schema<TrackMutation>({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album not found',
    },
  },
  name: {
    type: String,
    required: true,
  },
  length: String,
  number: {
    type: Number,
    required: true,
  }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
