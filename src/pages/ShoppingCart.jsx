import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import ProductQuantity from '../components/ProductQuantity';
import { getStorage, removeProduct } from '../services/localStorageFuncs';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  componentDidMount() {
    this.setState({
      cart: getStorage() || [],
    });
  }

  handleRemoveCart = (product) => {
    removeProduct(product.id);
    const products = getStorage();
    this.setState({
      cart: products,
    });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        { !cart.length
        && <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio!</h3> }
        { cart === undefined ? '' : cart.map((product) => (
          <section key={ product.id }>
            <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
            <h4>{ product.price }</h4>
            <ProductQuantity quantity={ product.available_quantity } />
            <button
              type="button"
              onClick={ () => this.handleRemoveCart(product) }
              data-testid="remove-product"
            >
              Remover
            </button>
          </section>
        )) }
        <Link
          to="/shoppingcheckout"
          data-testid="checkout-products"
        >
          <button type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}
