import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

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
      releaseDate: 2024,
      image: 'fixtures/summer.jpg',
    }, {
      name: 'Spring',
      artist: ivanArtist,
      releaseDate: 2023,
      image: 'fixtures/spring.jpg',
    }, {
      name: 'Darkness',
      artist: sergeyArtist,
      releaseDate: 2018,
      image: 'fixtures/darkness.webp',
  });

  await Track.create({
      name: 'Into the dark',
      album: darknessAlbum,
      length: '3:45',
      number: 1,
    }, {
      name: 'Summer vacation',
      album: summerAlbum,
      length: '5:30',
      number: 1,
    }, {
      name: 'Fear me',
      album: darknessAlbum,
      length: '4:44',
      number: 2,
    }, {
      name: 'Breath of the wild wind',
      album: springAlbum,
      length: '6:05',
      number: 1,
    }, {
      name: 'Final gate',
      album: darknessAlbum,
      length: '2:50',
      number: 3,
  });

  await db.close();
  await mongoose.disconnect();
};

run().catch(console.error);