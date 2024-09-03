import express from 'express';
import Artist from '../models/Artist';
import { ArtistMutation } from '../types';
import { imageUpload } from '../multer';
import mongoose from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', imageUpload.single('photo'), async (req, res, next) => {
  try {
    const artistMutation: ArtistMutation = {
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const artist = new Artist(artistMutation);
    await artist.save();

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default artistsRouter;
