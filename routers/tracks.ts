import express from 'express';
import { TrackMutation } from '../types';
import mongoose from 'mongoose';
import Track from '../models/Track';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const album = req.query.album as { album: string };
    const tracks = await Track.find(album ? { album: album } : {});

    return res.send(tracks);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackMutation: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      length: req.body.length,
    };

    const track = new Track(trackMutation);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default tracksRouter;
