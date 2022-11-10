import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import useUser from '../../features/user/use-user.hook';
import { LinkButton } from '../common';
import ProfileButton from './profile-button.component';

function NavBar() {
  const { user } = useUser();

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
          href="/"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Foodie
          </Link>
        </Typography>
        {user ? (
          <ProfileButton />
        ) : (
          <LinkButton href="/login">Login</LinkButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;