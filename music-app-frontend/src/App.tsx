import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import OneArtist from './features/artists/OneArtist';
import OneAlbum from './features/artists/OneAlbum';
import Artists from './features/artists/Artists';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TracksHistory from './features/tracks/TracksHistory';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists/:artistId" element={<OneArtist />} />
          <Route path="/albums/:albumId" element={<OneAlbum />} />
          <Route
            path="/tracks_history"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
                <TracksHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
