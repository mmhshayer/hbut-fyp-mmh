import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { LinkButton } from '../common';

function NavBar() {
  return (
    <>
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
              News
            </Typography>
            <LinkButton href="/login">Login</LinkButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
