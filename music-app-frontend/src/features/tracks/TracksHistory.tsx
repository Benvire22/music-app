import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';

const TracksHistory = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {!user && <Navigate to="/" />}
      Tracks History
    </>
  );
};

export default TracksHistory;
