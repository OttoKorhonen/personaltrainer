import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Customerlist from './components/Customerlist'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Traininglist from './components/Traininglist'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Calendar } from '@material-ui/pickers';


function App() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Personal trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}>
        <ListItem button onClick={handleDrawerClose}>
          <ListItemIcon>
            <NavigateBeforeIcon />
          </ListItemIcon>
        </ListItem>
        <List>
          <ListItem button onClick={() => setValue(0)}>
            <ListItemIcon >
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Customer list" />
          </ListItem>

          <ListItem button button onClick={() => setValue(1)}>
            <ListItemIcon >
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Training list" />
          </ListItem>

          <ListItem button button onClick={() => setValue()}>
            <ListItemIcon >
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </List>
      </Drawer>
      <div>
        {value === 0 ? (<Customerlist />) : value === 1 ? (<Traininglist />) : (<Calendar />) }
      </div>
    </div>
  );
}
export default App;