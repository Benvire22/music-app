import { Alert, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectFetchingArtists } from './artistsSlice';
import { fetchArtists } from './artistsThunks';
import ArtistItem from './components/ArtistItem';
import { selectUser } from '../users/usersSlice';

const Artists = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectFetchingArtists);

  useEffect(() => {
    try {
      void dispatch(fetchArtists()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no Artists here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artists.length > 0) {
    content = artists.map((artist) => {
      if (artist.isPublished) {
        return (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            description={artist.description}
            photo={artist.photo}
            isPublished={artist.isPublished}
            user={user}
          />
        );
      } else if (user?.role === 'admin') {
        return (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            description={artist.description}
            photo={artist.photo}
            isPublished={artist.isPublished}
            user={user}
          />
        )
      }
    });
  }

  return (
    <Grid container spacing={2}>
      <Grid container direction="column" spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h4">Artists</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent="center">
          {isFetching && <CircularProgress />}
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Artists;
