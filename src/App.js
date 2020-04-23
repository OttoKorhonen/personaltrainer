import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"> Personal trainer</Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Customerlist" style={{ margin: 20 }}>Customers</Link>{''}
          <Link to="/Traininglist">Trainigs</Link>{''}
          <Switch>
            <Route path="/Customerlist" component={Customerlist} />
            <Route path="/Traininglist" component={Traininglist} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;