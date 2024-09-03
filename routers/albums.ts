import express from "express";
import Album from "../models/Album";
import {imageUpload} from "../multer";
import {AlbumMutation} from "../types";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artist = req.query.artist as {artist: string};
        const albums = await Album.find(artist ? {artist: artist} : {});

        return res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist', '_id name photo');

        if (album === null) {
            res.status(404).send({ error: 'Album not found' });
        }

        return res.send(album);
    } catch (e) {
        next(e);
    }
});


albumsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    try {
        const albumMutation: AlbumMutation = {
            name: req.body.name,
            artist: req.body.artist,
            releaseDate: req.body.releaseDate,
            image: req.file ? req.file.filename : null,
        };

        const album = new Album(albumMutation);
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