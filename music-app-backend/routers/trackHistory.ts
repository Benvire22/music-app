import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return  res.status(401).send({error: 'User not found!'})
    }

    const historyTracks = await TrackHistory.find({user}).sort({ datetime: -1 });

    return res.send(historyTracks);
  } catch (e) {
    return next(e);
  }
});

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({error: 'User not found!'})
    }

    if (!mongoose.isValidObjectId(req.body.track)) {
      return res.status(400).send({ error: 'Invalid track ID' });
    }

    const track = await Track.findById(req.body.track);

    const trackHistory = new TrackHistory({
      user: user._id,
      track,
      datetime: new Date(),
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;
