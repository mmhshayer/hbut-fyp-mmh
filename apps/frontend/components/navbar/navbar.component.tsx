import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/system/Box/Box';
import { LinkButton } from '../common';
import ProfileButton from './profile-button.component';
import useAuth from '../../hooks/auth/use-auth.hook';

function NavBar() {
  const { token } = useAuth();

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
    >
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
        {token ? (
          <ProfileButton />
        ) : (
          <LinkButton href="/login">Login</LinkButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;