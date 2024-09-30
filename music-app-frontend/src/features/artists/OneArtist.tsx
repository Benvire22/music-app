import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchingOneArtist, selectOneArtist } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import { deleteAlbum, fetchAlbums, togglePublishedAlbum } from '../albums/albumsThunks';
import { selectAlbums, selectFetchingAlbums } from '../albums/albumsSlice';
import AlbumItem from '../albums/components/AlbumItem';
import { selectUser } from '../users/usersSlice';

const OneArtist: React.FC = () => {
  const user = useAppSelector(selectUser);
  const { artistId } = useParams() as { artistId: string };
  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectFetchingAlbums);
  const isFetching = useAppSelector(selectFetchingOneArtist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchOneArtist(artistId)).unwrap();
      void dispatch(fetchAlbums(artistId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, artistId]);

  const handleToggle = async (id: string) => {
    try {
      await dispatch(togglePublishedAlbum(id)).unwrap();
      await dispatch(fetchAlbums(artistId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteAlbum(id)).unwrap();
      await dispatch(fetchAlbums(artistId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no tracks here!
    </Alert>
  );

  if (albumsLoading) {
    content = (
      <Grid container size={12} direction="column" alignItems="center" justifyContent="center" spacing={2}>
        <CircularProgress />
      </Grid>
    );
  } else if (albums.length > 0) {
    content = albums.map((album) => {
      if (album.isPublished) {
        return (
          <AlbumItem
            key={album._id}
            id={album._id}
            name={album.name}
            releaseDate={album.releaseDate}
            image={album.image}
            isPublished={album.isPublished}
            user={user}
            handleDelete={() => handleDelete(album._id)}
          />
        );
      } else if (user?.role === 'admin') {
        return (
          <AlbumItem
            key={album._id}
            id={album._id}
            name={album.name}
            releaseDate={album.releaseDate}
            image={album.image}
            isPublished={album.isPublished}
            user={user}
            handleToggle={() => handleToggle(album._id)}
            handleDelete={() => handleDelete(album._id)}
          />
        );
      }
    });
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid>
        <Grid container justifyContent="space-between" marginBottom="50px" alignItems="center">
          <Grid>
            <Typography variant="h4">{artist?.name || (isFetching && <CircularProgress />)}</Typography>
          </Grid>
        </Grid>
        <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
          Back to all Artists
        </Button>
      </Grid>
      <Grid container>{content}</Grid>
    </Grid>
  );
};

export default OneArtist;
