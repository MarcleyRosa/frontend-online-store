import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  state = {
    count: 1,
    disabled: true,
  }

  componentDidMount() {
    this.decreaseQuantity();
    this.increaseQuantity();
  }

  increaseQuantity = () => {
    const { count } = this.state;
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
    if (count >= 2) {
      this.setState({
        disabled: false,
      });
    }
  }

  decreaseQuantity = () => {
    const { count } = this.state;
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
    if (count > 1) {
      this.setState({
        disabled: false,
      });
    }
    if (count <= 1) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { location: { state: { cart } } } = this.props;
    const { count, disabled } = this.state;
    return (
      <div>
        { !cart.length
        && <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio!</h3> }
        { cart === undefined ? '' : cart.map((product) => (
          <section key={ product.id }>
            <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
            <h4>{ product.price }</h4>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              { count }
            </p>
            <button
              type="button"
              disabled={ disabled }
              data-testid="product-decrease-quantity"
              onClick={ this.decreaseQuantity }
            >
              -
            </button>
            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ this.increaseQuantity }
            >
              +
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
