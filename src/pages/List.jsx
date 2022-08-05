import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
  render() {
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="./shoppingcart">
          <button type="button">
            Shopping Cart
          </button>
        </Link>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </div>
    );
  }
}
