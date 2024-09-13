import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const { album } = req.query;

    if (!mongoose.isValidObjectId(album)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    const tracks = await Track.find(album ? { album } : {}).sort({number: 1});

    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const track = new Track({
      name: req.body.name,
      album: req.body.album,
      length: req.body.length,
    });

    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default tracksRouter;
