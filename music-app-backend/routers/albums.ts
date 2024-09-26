import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/Album';
import { imageUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

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

albumsRouter.post('/', imageUpload.single('image'), auth, permit('user', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!req.body.name || !req.body.artist || !req.body.releaseDate) {
      return res.status(400).send({error: 'All fields are required!'});
    }

    if (parseFloat(req.body.releaseDate) < 1) {
      return res.status(400).send({error: 'Release date cannot be negative!'});
    }

    const album = new Album({
      name: req.body.name,
      artist: req.body.artist,
      releaseDate: parseFloat(req.body.releaseDate),
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const editedAlbum = await Album.findById(req.params.id);

    if (!editedAlbum) {
      return res.status(400).send({ error: 'Artist not found!' });
    }

    editedAlbum.isPublished = !editedAlbum.isPublished;
    editedAlbum.save();

    return res.send(editedAlbum);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);

    if (!deletedAlbum) {
      return res.status(400).send({ error: 'Album not found!' });
    }

    return res.send({ albumId: deletedAlbum._id });
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;
