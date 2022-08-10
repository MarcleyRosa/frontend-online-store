import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductQuantity extends Component {
  state = {
    count: 1,
    disabled: true,
  }

  increaseQuantity = () => {
    const { quantity } = this.props;
    const { count } = this.state;
    const MAX = quantity;
    if (count >= MAX) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState((prevState) => ({
        count: prevState.count + 1,
        disabled: false,
      }));
    }
  }

  decreaseQuantity = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }), () => {
      const { count } = this.state;
      if (count === 1) {
        this.setState({
          disabled: true,
        });
      }
    });
  }

  render() {
    const { count, disabled } = this.state;
    return (
      <section>
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
    );
  }
}

ProductQuantity.propTypes = {
  quantity: PropTypes.string.isRequired,
};

export default ProductQuantity;
