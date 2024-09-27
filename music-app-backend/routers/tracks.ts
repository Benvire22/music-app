import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const { album } = req.query;

    if (!mongoose.isValidObjectId(album)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    const tracks = await Track.find(album ? { album } : {}).sort({ number: 1 });

    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', auth, permit('user', 'admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!req.body.name || !req.body.album || !req.body.length || !req.body.number) {
      return res.status(400).send({error: 'All fields are required!'});
    }

    if (parseFloat(req.body.number) < 1) {
      return res.status(400).send({error: 'number date cannot be negative!'});
    }

    const track = new Track({
      name: req.body.name,
      album: req.body.album,
      length: req.body.length,
      number: parseFloat(req.body.number),
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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const editedTrack = await Track.findById(req.params.id);

    if (!editedTrack) {
      return res.status(400).send({ error: 'Artist not found!' });
    }

    editedTrack.isPublished = !editedTrack.isPublished;
    editedTrack.save();

    return res.send(editedTrack);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    const deletedTrack = await Track.findByIdAndDelete(req.params.id);


    if (!deletedTrack) {
      return res.status(400).send({ error: 'Track not found!' });
    }

    return res.send({ trackId: deletedTrack._id });
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;
