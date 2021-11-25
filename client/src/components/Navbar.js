import React from 'react';
import {
  Link, 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Menu,
  MenuItem, 
  useTheme, 
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Auth from '../utils/auth';

export default function ButtonAppBar() {
    // Import theme to use breakpoints
    const theme = useTheme();

    // Media query - anything larger than small is a large screen
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    // Handles appearance and closing of small screen menu bar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
      const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" underline="none" color="inherit">
              codeShare.
              </Link>
            </Typography>
            {largeScreen ? (
              <Box>
                <Link href="/">
                  <Button sx={{color: "white", fontSize: "2.3ch", mx: 2.5, pt: 1}} color="inherit">Home</Button>
                </Link>
                <Link href="/me">
                  <Button sx={{color: "white", fontSize: "2.3ch", mx: 2.5, pt: 1}} color="inherit">My Page</Button>
                </Link>
                {!Auth.loggedIn() ? (
                <Link href="/login">
                  <Button sx={{color: "white", fontSize: "2.3ch", mx: 2.5, pt: 1}} color="inherit">Login</Button>
                </Link>):(   
                <Link onClick={logout}>
                <Button sx={{color: "white", fontSize: "2.3ch", mx: 2.5, pt: 1}} color="inherit">Logout</Button>
              </Link>)}
              </Box>
            ) : ( 
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon 
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/" underline="none" color="inherit">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/me" underline="none" color="inherit">
                    My Page
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}> 
                {!Auth.loggedIn() ? (
                  <Link href="/login" underline="none" color="inherit">
                    Login
                  </Link>):(
                  <Link onClick={logout}  underline="none" color="inherit">
                  Logout
                </Link>)}
                </MenuItem>
              </Menu>
              </IconButton>
             )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }