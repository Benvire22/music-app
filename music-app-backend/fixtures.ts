import mongoose from 'mongoose';
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

  await User.create({
    username: 'user',
    password: '123WWW',
    token: crypto.randomUUID(),
    role: 'user',
  }, {
    username: 'admin',
    password: '123321',
    token: crypto.randomUUID(),
    role: 'admin',
  });

  const [ivanArtist, sergeyArtist] = await Artist.create({
    name: 'Ivan',
    photo: 'fixtures/ivan.jpg',
    description: 'Hello everyone',
    isPublished: true,
  }, {
    name: 'Sergey',
    photo: 'fixtures/sergey.webp',
    description: 'Hello everyone',
    isPublished: true,
  }, {
    name: 'John',
    photo: 'fixtures/john.jpg',
    isPublished: true,
  },{
    name: 'NUKE',
    photo: 'fixtures/john.jpg',
    isPublished: false,
  });

  const [summerAlbum, springAlbum, darknessAlbum, paradiseAlbum] = await Album.create({
    name: 'Summer',
    artist: ivanArtist,
    releaseDate: 2024,
    image: 'fixtures/summer.webp',
    isPublished: true,
  }, {
    name: 'Spring',
    artist: ivanArtist,
    releaseDate: 2023,
    image: 'fixtures/spring.jpg',
    isPublished: true,
  }, {
    name: 'Darkness',
    artist: sergeyArtist,
    releaseDate: 2018,
    image: 'fixtures/darkness.webp',
    isPublished: true,
  }, {
    name: 'Paradise',
    artist: sergeyArtist,
    releaseDate: 2012,
    image: 'fixtures/paradise.jpg',
    isPublished: true,
  },{
    name: 'Hell',
    artist: sergeyArtist,
    releaseDate: 2012,
    image: 'fixtures/paradise.jpg',
    isPublished: false,
  });

  await Track.create({
    name: 'Into the dark',
    album: darknessAlbum,
    length: '3:45',
    number: 1,
    isPublished: true,
  }, {
    name: 'Summer vacation',
    album: summerAlbum,
    length: '5:30',
    number: 1,
    isPublished: true,
  }, {
    name: 'Fear me',
    album: darknessAlbum,
    length: '4:44',
    number: 2,
    isPublished: true,
  }, {
    name: 'Breath of the wild wind',
    album: springAlbum,
    length: '6:05',
    number: 1,
    isPublished: true,
  }, {
    name: 'Final gate',
    album: darknessAlbum,
    length: '2:50',
    number: 3,
    isPublished: true,
  }, {
    name: 'Wrong heaven',
    album: paradiseAlbum,
    length: '5:15',
    number: 1,
    isPublished: true,
  }, {
    name: 'Hot wheels',
    album: summerAlbum,
    length: '5:30',
    number: 2,
    isPublished: true,
  }, {
    name: 'Dont cry',
    album: paradiseAlbum,
    length: '3:33',
    number: 2,
    isPublished: true,
  }, {
    name: 'Spring is coming!',
    album: springAlbum,
    length: '7:20',
    number: 2,
    isPublished: true,
  }, {
    name: 'Not over',
    album: darknessAlbum,
    length: '6:32',
    number: 4,
    isPublished: true,
  }, {
    name: 'Believe me',
    album: paradiseAlbum,
    length: '2:15',
    number: 3,
    isPublished: true,
  }, {
    name: 'Hey! hey! hey everyone!',
    album: summerAlbum,
    length: '3:35',
    number: 3,
    isPublished: true,
  }, {
    name: 'Don\'t worry',
    album: darknessAlbum,
    length: '5:32',
    number: 5,
    isPublished: true,
  }, {
    name: 'It\'s time to shine!',
    album: springAlbum,
    length: '3:40',
    number: 3,
    isPublished: true,
  }, {
    name: 'It is everlasting Summer',
    album: summerAlbum,
    length: '3:20',
    number: 4,
    isPublished: true,
  }, {
    name: 'I am Here',
    album: paradiseAlbum,
    length: '2:15',
    number: 4,
    isPublished: true,
  }, {
    name: 'You hear about it, didn\'t you?',
    album: springAlbum,
    length: '5:20',
    number: 4,
    isPublished: true,
  }, {
    name: 'falling',
    album: paradiseAlbum,
    length: '2:32',
    number: 5,
    isPublished: true,
  }, {
    name: 'Cherry!',
    album: springAlbum,
    length: '5:53',
    number: 5,
    isPublished: true,
  }, {
    name: 'Fine',
    album: summerAlbum,
    length: '3:23',
    number: 5,
    isPublished: true,
  }, {
    name: 'Trust',
    album: darknessAlbum,
    length: '5:20',
    number: 6,
    isPublished: false,
  },  {
    name: 'HEYO',
    album: summerAlbum,
    length: '3:40',
    number: 6,
    isPublished: false,
  },  {
    name: 'Fine',
    album: summerAlbum,
    length: '3:01',
    number: 7,
    isPublished: false,
  });

  await db.close();
  await mongoose.disconnect();
};

run().catch(console.error);