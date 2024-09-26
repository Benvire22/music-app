import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import { imageUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const artist = await Artist.findById(req.params.id);
    return res.send(artist);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post('/', imageUpload.single('photo'), auth, permit('user', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    const artist = new Artist({
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      description: req.body.description || null,
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

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const editedArtist = await Artist.findById(req.params.id);

    if (!editedArtist) {
      return res.status(400).send({ error: 'Artist not found!' });
    }

    editedArtist.isPublished = !editedArtist.isPublished;
    editedArtist.save();

    return res.send(editedArtist);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);

    if (!deletedArtist) {
      return res.status(400).send({ error: 'Artist not found!' });
    }

    return res.send({ artistId: deletedArtist._id });
  } catch (e) {
    return next(e);
  }
});

export default artistsRouter;
