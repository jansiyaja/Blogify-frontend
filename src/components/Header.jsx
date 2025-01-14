import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/frontend_Api';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        borderBottom: '1px solid #ddd',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Side Links */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={ROUTES.PUBLIC.HOME} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginRight: '20px', fontWeight: 'bold' }}
          >
            Blogify
          </Typography>
        </Link>
        <Link to={ROUTES.PUBLIC.HOME}>
          <Typography
            sx={{ marginRight: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Home
          </Typography>
        </Link>
        <Link to={ROUTES.PROTECTED.CREATE_BLOG}>
          <Typography
            sx={{ marginRight: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Blog
          </Typography>
        </Link>
      </Box>

   
   

      
      {user ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Typography>
          <Link to="/login">Login</Link>
        </Typography>
      )}

 
      {user && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 40,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to={ROUTES.PROTECTED.DASHBOARD}>
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
