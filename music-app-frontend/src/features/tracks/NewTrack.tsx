import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TrackMutation } from '../../types';
import { Typography } from '@mui/material';
import TrackForm from './components/TrackForm';
import { createTrack } from './tracksThunks';
import { selectCreatingTrack } from './tracksSlice';

const NewTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingTrack);

  const onFormSubmit = async (trackMutation: TrackMutation) => {
    try {
      await dispatch(createTrack(trackMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant='h4' sx={{ mb: 2 }}>New Track</Typography>
      <TrackForm
        onSubmit={onFormSubmit}
        isLoading={isCreating}
      />
    </>
  );
};

export default NewTrack;