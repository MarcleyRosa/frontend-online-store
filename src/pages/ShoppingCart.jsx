import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductQuantity from '../components/ProductQuantity';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  }

  componentDidMount() {
    this.handleCart();
  }

  handleCart = () => {
    const { location: { state: { cart } } } = this.props;
    this.setState({
      cart,
    });
  }

  handleRemoveCart = (product) => {
    console.log(product);
    const { cart } = this.state;
    const newCart = cart.filter((item) => item.id !== product.id);
    this.setState({
      cart: newCart,
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
            <ProductQuantity />
            <button
              type="button"
              onClick={ () => this.handleRemoveCart(product) }
              data-testid="remove-product"
            >
              Remover
            </button>
          </section>
        )) }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  location: PropTypes.objectOf({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf,
    }),
  }).isRequired,
};
