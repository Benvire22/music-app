import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import { imageUpload } from '../multer';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post('/', imageUpload.single('photo'), async (req, res, next) => {
  try {
    const artist = new Artist({
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      description: req.body.description,
    });

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
