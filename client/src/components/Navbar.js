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

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ fontSize: "3ch", flexGrow: 1 }}>
              codeShare.
            </Typography>
            {largeScreen ? (
              <Box>
                <Link href="/">
                  <Button variant="h3" sx={{color: "white"}} color="inherit">Home</Button>
                </Link>
                <Link href="/me">
                  <Button sx={{color: "white"}} color="inherit">My Page</Button>
                </Link>
                <Link href="/login">
                  <Button sx={{color: "white"}} color="inherit">Login</Button>
                </Link>
              </Box>
            ) : ( 
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon 
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
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
                  <Link href="/login" underline="none" color="inherit">
                    Login
                  </Link>
                </MenuItem>
              </Menu>
              </IconButton>
             )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }