import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '../../app/hooks';

const OneAlbum = () => {
  const { artistId } = useParams() as { artistId: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchOneArtist(id));
  }, [dispatch, artistId]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
          Back to Artists
        </Button>
      </Grid>
    </Grid>
  );
};

export default OneAlbum;
