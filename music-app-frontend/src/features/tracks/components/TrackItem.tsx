import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Props {
  id: string;
  name: string;
  number: number;
  length: string;
}

const TrackItem: React.FC<Props> = ({ name, number, length }) => {
  return (
    <Grid sx={{ width: '100%' }}>
      <Card sx={{ border: '2px solid lightblue', pt: '10px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">#{number}. </Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h5">{length}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackItem;
