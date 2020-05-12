import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';

class App extends Component {

  render() { 
    return (  
      <div className="app-container">
      <Router>
        <Link to="/"></Link>
        <Link to="/admin"></Link>
        <Switch className="app-content-items">
          <Route exact path="/"><Home /></Route>
          <Route exact path="/admin"><Admin /></Route>
        </Switch>
      </Router>
      </div>
    );
  }
}
 
export default App;