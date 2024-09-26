import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchingHistoryTracks, selectHistoryTracks } from './tracksSlice';
import React, { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import TrackHistoryItem from './components/TrackHistoryItem';
import { fetchHistoryTracks } from './tracksThunks';
import Grid from '@mui/material/Grid2';

const TracksHistory = () => {
  const tracks = useAppSelector(selectHistoryTracks);
  const isLoading = useAppSelector(selectFetchingHistoryTracks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchHistoryTracks()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  let content: React.ReactNode = <CircularProgress />;

  if (!isLoading && tracks?.length < 1) {
    content = (
      <Alert severity="info" sx={{ width: '100%' }}>
        There are no tracks history here!
      </Alert>
    );
  } else if (tracks?.length > 0) {
    content = tracks.map((track) => (
      <TrackHistoryItem
        key={track._id}
        track={track.track.name}
        artist={track.artist.name}
        datetime={track.datetime} />
    ));
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      {content}
    </Grid>
  );
};

export default TracksHistory;
