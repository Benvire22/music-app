import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addTrackToHistory } from '../tracksThunks';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { User } from '../../../types';
import { selectPublishingTrack } from '../tracksSlice';

interface Props {
  id: string;
  name: string;
  number: number;
  length: string;
  isPublished: boolean;
  user: User | null;
  handleToggle?: VoidFunction;
  handleDelete?: VoidFunction;
}

const TrackItem: React.FC<Props> = ({ id, name, number, length, isPublished, user, handleToggle, handleDelete }) => {
  const dispatch = useAppDispatch();
  const isPublishing = useAppSelector(selectPublishingTrack);
  const isDeleting = useAppSelector(selectPublishingTrack);

  const playTrack = async () => {
    try {
      await dispatch(addTrackToHistory(id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid sx={{ width: '100%' }}>
      <Card sx={{ border: '2px solid lightblue', p: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            #{number}. {user && (<Button variant='contained' onClick={playTrack}> play</Button>)}
          </Typography>
          <Typography component={Grid} justifyContent='center' textAlign='center'>
            <Typography variant='h5' marginBottom='10px'>
              {name}
            </Typography>
            {user?.role === 'admin' && !isPublished && (
              <LoadingButton
                type='button'
                onClick={handleToggle}
                color='primary'
                sx={{ mr: 2 }}
                loading={isPublishing}
                loadingPosition='end'
                endIcon={<ArrowForwardIcon />}
                variant='contained'
              >
                <span>Publish</span>
              </LoadingButton>
            )}
            {user?.role === 'admin' && (
              <LoadingButton
                type='button'
                onClick={handleDelete}
                color='error'
                loading={isDeleting}
                loadingPosition='end'
                endIcon={<DeleteForeverIcon />}
                variant='contained'
              >
                <span>delete</span>
              </LoadingButton>
            )}
          </Typography>
          <Typography variant='h5'>{length}</Typography>
        </CardContent>

      </Card>
    </Grid>
  );
};

export default TrackItem;
