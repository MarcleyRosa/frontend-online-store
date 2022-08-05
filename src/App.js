import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import List from './pages/List';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ List } />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
