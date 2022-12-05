import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import Link from 'next/link';
import useUser from '../../features/user/use-user.hook';
import { LinkButton } from '../common';
import ProfileButton from './profile-button.component';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuIcon from '@mui/icons-material/Menu';
import { DashboardRoute } from '../../features/router/router.config';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { sidebarLinks } from './sidebar.seed';

const drawerWidth = 240;

function NavBar() {
  const { user } = useUser();
  const router = useRouter();
  const isDashboardRoute = router.asPath.startsWith(DashboardRoute);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(sidebarLinks);

  const toogleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (router.isReady) {
      setItems(sidebarLinks);
    }
  }, [router, open]);

  return (
    <Box sx={{
      display: 'flex',
    }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.default', color: 'text.primary' }}
      >
        <Toolbar>
          {isDashboardRoute ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toogleDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                href="/"
              >
                <FoodBankIcon />
              </IconButton>
          )}
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
            <>
              <LinkButton href="/login">Login</LinkButton>
              <LinkButton href="/register">Register</LinkButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{
            pt: 10,
          }}>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton href={`${DashboardRoute}/${item.path}`}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavBar;
