import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import List from './pages/List';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ List } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route
            exact
            path="/product-details/:id"
            component={ ProductDetails }
          />
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
