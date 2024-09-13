import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/Album';
import { imageUpload } from '../multer';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const { artist } = req.query;

    if (!mongoose.isValidObjectId(artist)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const albums = await Album.find(artist ? { artist } : {}).sort({ releaseDate: -1 });
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    const album = await Album.findById(req.params.id).populate('artist', '_id name description');

    if (album === null) {
      return res.status(404).send({ error: 'Album not found' });
    }

    return res.send(album);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const album = new Album({
      name: req.body.name,
      artist: req.body.artist,
      releaseDate: req.body.releaseDate,
      image: req.file ? req.file.filename : null,
    });

    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default albumsRouter;
