import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { addTrackToHistory } from '../tracksThunks';

interface Props {
  id: string;
  name: string;
  number: number;
  length: string;
}

const TrackItem: React.FC<Props> = ({id, name, number, length }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const playTrack = async () => {
    try {
      await dispatch(addTrackToHistory(id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid sx={{ width: '100%' }}>
      <Card sx={{ border: '2px solid lightblue', pt: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">#{number}. {user && ( <Button variant="contained"  onClick={playTrack}> play</Button>)}
          </Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h5">{length}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackItem;
