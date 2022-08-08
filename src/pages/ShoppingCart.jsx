import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  // quantityProduct = ({ target }) => {
  //   console.log(target.value);
  //   this.setState({
  //     quantityProduct: target.value,
  //   });
  // }

  render() {
    const { location: { state: { cart } } } = this.props;
    console.log(this.props);
    // const { quantityProduct } = this.state;
    return (
      <div>
        { !cart.length
        && <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio!</h3> }
        { cart === undefined ? '' : cart.map((product) => (
          <section key={ product.id }>
            <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
            <h4>{ product.price }</h4>
            <button
              data-testid="shopping-cart-product-quantity"
              type="button"
            >
              1
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
