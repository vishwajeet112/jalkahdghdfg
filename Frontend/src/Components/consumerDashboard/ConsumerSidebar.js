// Sidebar.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/system';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  justifyContent: 'flex-end',
}));

const StyledMainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: 'auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StylesListItem = styled(ListItem)(({ theme,isActive }) => ({
  color:isActive && '#fff',
  backgroundColor:isActive && '#000'
}))

const ConsumerSidebar = ({ user,setCurrentStep,currentStep, open, setOpen }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };



      const handleBackdropClick = (e) => {
        // Close the drawer when clicking outside of it
        if (e.target.id === 'backdrop-id') {
          handleDrawerClose();
        }
      };

console.log(user.profileImg);
  return (
    <div>
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={open}
      >
         <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            { <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <StyledAvatar alt="Profile Image" src={user?.profileImg} sx={{ width: 80, height: 80 }} />
        <Typography style={{ textAlign:'center'}}>{user?.fullname}</Typography>
        <Divider />
        <List>
          {/* Add your sidebar items here */}
          <StylesListItem button onClick={() => setCurrentStep(1)} isActive={currentStep === 1}>
            <ListItemIcon>
              {/* Add your icon component here */}
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Profile Details" />
          </StylesListItem>
          <StylesListItem button onClick={() => setCurrentStep(2)} isActive={currentStep === 2}>
            <ListItemIcon>
              {/* Add your icon component here */}
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Update Details" />
          </StylesListItem>
          <StylesListItem button onClick={() => setCurrentStep(3)} isActive={currentStep === 3}>
            <ListItemIcon>
              {/* Add your icon component here */}
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </StylesListItem>
          <StylesListItem button onClick={() => setCurrentStep(4)} isActive={currentStep === 3}>
            <ListItemIcon>
              {/* Add your icon component here */}
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Billing Details" />
          </StylesListItem>
          <StylesListItem button onClick={() => navigate('/login')} isActive={currentStep === 3}>
            <ListItemIcon>
              {/* Add your icon component here */}
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StylesListItem>
          {/* Add more items as needed */}
        </List>
      </StyledDrawer>
      <StyledMainContent>
        {/* Your main content goes here */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </StyledMainContent>
      <IconButton
        color="inherit"
        aria-label="close drawer"
        onClick={handleDrawerClose}
        edge="start"
        style={{ display: open ? 'block' : 'none' }}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default ConsumerSidebar;
