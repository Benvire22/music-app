import { Alert, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectFetchingArtists } from './artistsSlice';
import { fetchArtists } from './artistsThunks';
import ArtistItem from './components/ArtistItem';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectFetchingArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no Artists here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artists.length > 0) {
    content = artists.map((artist) => (
      <ArtistItem
        key={artist._id}
        id={artist._id}
        name={artist.name}
        description={artist.description}
        photo={artist.photo}
      />
    ));
  }

  return (
    <Grid container spacing={2}>
      <Grid container direction="column" spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h4">Artists</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {isFetching && <CircularProgress />}
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Artists;
