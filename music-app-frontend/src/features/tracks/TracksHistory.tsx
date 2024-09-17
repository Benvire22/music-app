import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';
import { selectFetchingHistoryTracks, selectHistoryTracks } from './tracksSlice';
import React, { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import TrackHistoryItem from './components/TrackHistoryItem';
import { fetchHistoryTracks } from './tracksThunks';

const TracksHistory = () => {
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectHistoryTracks);
  const isLoading = useAppSelector(selectFetchingHistoryTracks);
  const dispatch = useAppDispatch();


  useEffect(() => {
    try {
      void dispatch(fetchHistoryTracks()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch])

  let content: React.ReactNode = <CircularProgress />;

  if (isLoading) {
    content = (
      <Alert severity="info" sx={{ width: '100%' }}>
        There are no tracks history here!
      </Alert>
    );
  } else if (tracks.length > 0) {
    content = tracks.map((track) => (
      <TrackHistoryItem
        key={track._id}
        track={track.track.name}
        artist={track.track.artist}
        datetime={track.datetime}
      />
    ));
  }


  return (
    <>
      {!user && <Navigate to="/" />}
      {content}
    </>
  );
};

export default TracksHistory;
