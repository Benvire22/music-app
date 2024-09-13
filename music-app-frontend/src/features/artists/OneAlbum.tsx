import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOneAlbum } from '../albums/albumsThunks';
import { selectOneAlbum } from '../albums/albumsSlice';
import { selectFetchingTracks, selectTracks } from '../tracks/tracksSlice';
import TrackItem from '../tracks/components/TrackItem';
import { fetchTracks } from '../tracks/tracksThunks';

const OneAlbum = () => {
  const { albumId } = useParams() as { albumId: string };
  const album = useAppSelector(selectOneAlbum);
  // const isFetching = useAppSelector(selectFetchingOneAlbum);
  const tracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectFetchingTracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchOneAlbum(albumId));
    void dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  let content: React.ReactNode = (
    <CircularProgress />
  );

  if (tracksLoading) {
    content = (
      <Alert severity="info" sx={{ width: '100%' }}>
        There are no tracks here!
      </Alert>
    )
  } else if (tracks.length > 0) {
    content = tracks.map((track) => (
      <TrackItem
        key={track._id}
        id={track._id}
        name={track.name}
        number={track.number}
        length={track.length}
      />
    ));
  }

  return album && (
    <Grid container direction="column" spacing={4}>
      <Grid container justifyContent="space-between" spacing={2} alignItems="center">
        <Grid>
          <Typography variant="h2" marginBottom="20px">{album.artist.name}</Typography>
          <Typography variant="h4" color="secondary">Album: {album.name}</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
          Back to all Artists
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneAlbum;