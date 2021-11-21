import React from 'react';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function ButtonAppBar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              codeShare.
            </Typography>
            <Link href="/">
              <Button sx={{color: "white"}} color="inherit">Main Page</Button>
            </Link>
            <Link href="/me">
              <Button sx={{color: "white"}} color="inherit">My Page</Button>
            </Link>
            <Link href="/login">
              <Button sx={{color: "white"}} color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }