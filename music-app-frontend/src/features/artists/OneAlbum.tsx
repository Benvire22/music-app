import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOneAlbum } from '../albums/albumsThunks';
import { selectFetchingOneAlbum, selectOneAlbum } from '../albums/albumsSlice';
import { selectFetchingTracks, selectTracks } from '../tracks/tracksSlice';
import TrackItem from '../tracks/components/TrackItem';
import { deleteTrack, fetchTracks, togglePublishedTrack } from '../tracks/tracksThunks';
import { selectUser } from '../users/usersSlice';

const OneAlbum = () => {
  const user = useAppSelector(selectUser);
  const { albumId } = useParams() as { albumId: string };
  const album = useAppSelector(selectOneAlbum);
  const isFetching = useAppSelector(selectFetchingOneAlbum);
  const tracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectFetchingTracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchOneAlbum(albumId)).unwrap();
      void dispatch(fetchTracks(albumId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, albumId]);

  const handleToggle = async (id: string) => {
    try {
      await dispatch(togglePublishedTrack(id)).unwrap();
      await dispatch(fetchTracks(albumId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTrack(id)).unwrap();
      await dispatch(fetchTracks(albumId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  let content: React.ReactNode = (
    <Alert severity='info' sx={{ width: '100%' }}>
      There are no tracks here!
    </Alert>
  );

  if (tracksLoading) {
    content = (
      <Grid container size={12} direction='column' alignItems='center' justifyContent='center' spacing={2}>
        <CircularProgress />
      </Grid>
    );
  } else if (tracks.length > 0) {
    content = tracks.map((track) => {
      if (track.isPublished) {
        return (
          <TrackItem
            key={track._id}
            id={track._id}
            name={track.name}
            number={track.number}
            length={track.length}
            isPublished={track.isPublished}
            user={user}
            handleDelete={() => handleDelete(track._id)}
          />
        );
      } else if (user?.role === 'admin') {
        return (
          <TrackItem
            key={track._id}
            id={track._id}
            name={track.name}
            number={track.number}
            length={track.length}
            isPublished={track.isPublished}
            user={user}
            handleToggle={() => handleToggle(track._id)}
            handleDelete={() => handleDelete(track._id)}
          />
        );
      }
    });
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid container justifyContent='space-between' spacing={2} alignItems='center'>
        <Grid>
          {isFetching ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant='h2' marginBottom='20px'>
                {album?.artist.name}
              </Typography>
              <Typography variant='h4' color='secondary'>
                Album: {album?.name}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Button variant='text' startIcon={<ArrowBackIcon />} component={Link} to='/'>
          Back to all Artists
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneAlbum;
