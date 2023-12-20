import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; 
import Group from '../home/Assets/Group.png';
import '../home/css/Navbar.css'; 

const Navbar2 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static" className='nav-container'>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className='menu-icon'
          >
            <MenuIcon />
          </IconButton>
          <div className="logo-container">
            <img src={Group} alt="Logo" className="logo-img" />
            <Typography variant="h6" className="logo-text">
              JalSamadhan
            </Typography>
          </div>
          <div className="navbar-links-container">
            <Button color="inherit" component={Link} to="/govtDashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/GISMapping">GIS Mapping</Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button key="Dashboard" onClick={handleDrawerClose} component={Link} to="/govtdashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Gis Mapping" onClick={handleDrawerClose} component={Link} to="/GISMapping">
            <ListItemText primary="Gis Mapping" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar2;
