import { Alert, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  // const artists = useAppSelector(selectArtists);

  useEffect(() => {
    // dispatch(fetchArtists());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no Artists here!
    </Alert>
  );

  // if (isFetching) {
  //   content = <CircularProgress />;
  // } else if (artists.length > 0) {
  //   content = artists.map((artist) => (
  //     <ArtistItem
  //       key={artist._id}
  //       id={artist._id}
  //       description={artist.description}
  //       photo={artist.image}
  //     />
  //   ));
  // }

  return (
    <Grid container spacing={2}>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Hello</Typography>
          </Grid>
          <Grid item>
            <Button color="primary" component={Link} to="/products/new">
              Add product
            </Button>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          {/*{isFetching && <CircularProgress />}*/}
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Artists;
