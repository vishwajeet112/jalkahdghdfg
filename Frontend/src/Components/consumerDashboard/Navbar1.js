import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Group from '../home/Assets/Group.png';
import './css/Navbar1.css'; 

const Navbar = ({open}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
    setDropdownVisible(true);

    setTimeout(() => {
      setDropdownVisible(false); 
    }, 3000);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div style={{ marginLeft: open && '200px'}}>
      <AppBar position="static" className='nav-container'>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className='menu-icon1'
          >
            <MenuIcon  />
          </IconButton>
          <div className="logo-container">
            <img src={Group} alt="Logo" className="logo-img" />
            <Typography variant="h6" className="logo-text">
              JalSamadhan
            </Typography>
          </div>
          <div className="navbar-links-container1">
            <Button color="inherit" href="/ConsumerDashboard">Home</Button>
            <Button color="inherit" href="/about">AboutUs</Button>
            <Button color="inherit" href="/sessions">Online Sessions</Button>
            <Button color="inherit" href="/blogs">Blogs</Button>
            <Button color="inherit" href="/profile">Profile</Button>
            <div className="dropdown-container">
           <p onClick={toggleDropdown} className='support-dropdown'>SUPPORT</p>
           {dropdownVisible && (
            <div className="dropdown-content">
               <Button color="inherit" href="/complaint">Complaint</Button><br/><hr/>
            <Button color="inherit" href="/faqs">FAQs</Button><br/><hr/>
            <Button color="inherit" href="/feedback">Feedbacks</Button>
            </div>
          )}
        </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
        <ListItem button key="Home" onClick={handleDrawerClose} component={Link} to="/consumer">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="About" onClick={handleDrawerClose} component={Link} to="/about">
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button key="Sessions" onClick={handleDrawerClose} component={Link} to="/sessions">
            <ListItemText primary="Online Sessions" />
          </ListItem>
          <ListItem button key="Blogs" onClick={handleDrawerClose} component={Link} to="/blogs">
            <ListItemText primary="Blogs" />
          </ListItem>
          <div className="dropdown-container">
          <p onClick={toggleDropdown} className='dropdown1'>Support</p>
          {dropdownVisible && (
            <div className="dropdown-content">

                 <ListItem button key="Complaint" onClick={handleDrawerClose} component={Link} to="/complaint">
                  <ListItemText primary="Complaint" />
                </ListItem>
                <ListItem button key="FAQs" onClick={handleDrawerClose} component={Link} to="/faqs">
                  <ListItemText primary="FAQs" />
                </ListItem>
                <ListItem button key="Feedback" onClick={handleDrawerClose} component={Link} to="/feedback">
                  <ListItemText primary="Feedback" />
                </ListItem>
            </div>
          )}
        </div>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
