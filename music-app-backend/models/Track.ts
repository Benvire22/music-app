import mongoose, { Types } from 'mongoose';
import Album from './Album';
import { TrackModel, TrackMutation} from '../types';

const Schema = mongoose.Schema;

const TrackSchema = new Schema<TrackMutation, TrackModel>({
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
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Track = mongoose.model<TrackMutation, TrackModel>('Track', TrackSchema);
export default Track;
