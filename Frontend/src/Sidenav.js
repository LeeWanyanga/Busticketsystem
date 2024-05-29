import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IoMdHome } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { IoHappyOutline } from "react-icons/io5";
import Contact from './pages/About';
import { styled, useTheme } from '@mui/material/styles'; 
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  paddingLeft: 12,
}));

export default function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menudata, setMenudata] = useState("Home");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            <h3 style={{ color: 'red', fontSize: '1.5rem', textAlign: 'center' }}> THE SYNERGIES</h3>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem enablePadding  onClick={() => setMenudata("Home")}>
            <StyledListItemIcon>
              <IoMdHome />
            </StyledListItemIcon>
            <StyledListItemText primary="Home" />
          </ListItem>
          <ListItem disablePadding button onClick={() => setMenudata("Contact")}>
            <StyledListItemIcon>
              <IoCall />
            </StyledListItemIcon>
            <StyledListItemText primary="Contact" />
          </ListItem>
          <ListItem disablePadding button  onClick={() => setMenudata("Shorts")}>
            <StyledListItemIcon>
              <SiYoutubeshorts />
            </StyledListItemIcon>
            <StyledListItemText primary="Shorts" />
          </ListItem>
          <ListItem disablePadding button onClick={() => setMenudata("Subscriptions")}>
            <StyledListItemIcon>
              <MdSubscriptions />
            </StyledListItemIcon>
            <StyledListItemText primary="Subscriptions" />
          </ListItem>
          <ListItem disablePadding button onClick={() => setMenudata("You")}>
            <StyledListItemIcon>
              <IoHappyOutline />
            </StyledListItemIcon>
            <StyledListItemText primary="You" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {menudata === "Home" && <Home />}
        {menudata === "Contact" && <Contact />}
      </Box>
    </Box>
  );
}
