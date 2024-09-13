import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
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
      <Card sx={{height: '100%'}}>
        <strong>#{number}.</strong>
        <CardHeader title={name}/>
        <CardContent>
          <strong>продолжительность: {length}</strong>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackItem;
