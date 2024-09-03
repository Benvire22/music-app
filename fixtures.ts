import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (error) {
    console.log('Skipping drop...')
  }

  const [
    ivanArtist,
    sergeyArtist,
    johnArtist
  ] = await Artist.create({
    name: 'Ivan',
    photo: 'fixtures/ivan.png',
    description: 'Hello everyone',
  },{
    name: 'Sergey',
    photo: 'fixtures/sergey.webp',
    description: 'Hello everyone',
  },{
    name: 'John',
    photo: 'fixtures/john.png'
  });

  const [
    summerAlbum,
    springAlbum,
    darknessAlbum
  ] = await Album.create({
    name: 'Summer',
    artist: ivanArtist,
    releaseDate: '2024',
    image: 'fixtures/summer.jpg',
  },{
    name: 'Spring',
    artist: ivanArtist,
    releaseDate: '2023',
    image: 'fixtures/spring.jpg',
  },{
    name: 'Darkness',
    artist: sergeyArtist,
    releaseDate: '2018',
    image: 'fixtures/darkness.webp',
  });

  await Track.create({
    name: 'Into the dark',
    album: darknessAlbum,
    length: '3:45',
  },{
    name: 'Summer vacation',
    album: summerAlbum,
    length: '5:30',
  },{
    name: 'Fear me',
    album: darknessAlbum,
    length: '4:44',
  },{
    name: 'Breath of the wild wind',
    album: springAlbum,
    length: '6:05',
  },{
    name: 'Final gate',
    album: darknessAlbum,
    length: '2:50',
  });

  await db.close();
};

run().catch(console.error);