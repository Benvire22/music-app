import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { NavLink } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Grid>
      <Button color="inherit" onClick={handleClick}>Hello, {user.username}</Button>
      <Menu open={isOpen} onClose={handleClose} anchorEl={anchorEl} keepMounted>
        <MenuItem>
          <Button sx={{width: '100px'}} color="inherit" component={NavLink} to="/tracks/history">Show tracks history</Button>
        </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;