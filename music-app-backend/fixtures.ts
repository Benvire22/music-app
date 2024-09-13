import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropDatabase();
    console.log('Database dropped successfully');
  } catch (e) {
    console.log('Error dropping database:', e);
  }

  const [ivanArtist, sergeyArtist] = await Artist.create({
      name: 'Ivan',
      photo: 'fixtures/ivan.png',
      description: 'Hello everyone',
    }, {
      name: 'Sergey',
      photo: 'fixtures/sergey.webp',
      description: 'Hello everyone',
    }, {
      name: 'John',
      photo: 'fixtures/john.png',
  });

  const [summerAlbum, springAlbum, darknessAlbum] = await Album.create({
      name: 'Summer',
      artist: ivanArtist,
      releaseDate: '2024',
      image: 'fixtures/summer.jpg',
    }, {
      name: 'Spring',
      artist: ivanArtist,
      releaseDate: '2023',
      image: 'fixtures/spring.jpg',
    }, {
      name: 'Darkness',
      artist: sergeyArtist,
      releaseDate: '2018',
      image: 'fixtures/darkness.webp',
  });

  await Track.create({
      name: 'Into the dark',
      album: darknessAlbum,
      length: '3:45',
    }, {
      name: 'Summer vacation',
      album: summerAlbum,
      length: '5:30',
    }, {
      name: 'Fear me',
      album: darknessAlbum,
      length: '4:44',
    }, {
      name: 'Breath of the wild wind',
      album: springAlbum,
      length: '6:05',
    }, {
      name: 'Final gate',
      album: darknessAlbum,
      length: '2:50',
  });

  await User.create({
      username: 'John',
      password: '123',
      token: randomUUID(),
    }, {
      username: 'Jane',
      password: '1234',
      token: randomUUID(),
    }, {
      username: 'Dana',
      password: '123',
      token: randomUUID(),
  });

  await db.close();
  await mongoose.disconnect();
};

run().catch(console.error);