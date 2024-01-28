import * as React from 'react';
import Header from './header';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../state/action-creators";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const routeIcons = {
    history: FaHistory,
    liked: FaRegHeart,
  };
  
  const routes = Object.keys(routeIcons);
  
  // Inside your component
  const location = useLocation();
  
  // Helper function to check if a route is active
  const isActiveRoute = (route) => location.pathname.includes(route);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
}

  return (
    <>
      <CssBaseline />
      <AppBar color='inherit' position="fixed" sx={{ height: 0 }} open={open}>
        <Header />
      </AppBar>
      {isLoggedIn && 
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{
            opacity: !open ? 0 : 1,
            transition: 'opacity 0.5s ease',
            }} >
            <FaAnglesLeft size={20} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        { <IconButton 
          onClick={handleDrawerOpen}  
          title='open' 
          sx={{
            opacity: open ? 0 : 1,
            transition: 'opacity 0.5s ease',
            }}>
              <FaAnglesRight size={20} />
        </IconButton>}
        <Divider />
        <List>
  {routes.map((route, index) => (
    <ListItem key={route} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={Link} // Using Link from react-router-dom
        to={`/${route}`} // Path to the route
        title={route}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          backgroundColor: isActiveRoute(route) ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // Highlight active route
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {React.createElement(routeIcons[route], {size: 20, color: isActiveRoute(route) ? 'red' : ''})}
        </ListItemIcon>
        <ListItemText primary={route.charAt(0).toUpperCase() + route.slice(1)} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>
        <Divider />
        <List>
          {['Logout'].map((text, index) => (
            <ListItem onClick={handleLogout} key={text} disablePadding title={text} sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LuLogOut size={25} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      }
      </>
  );
}