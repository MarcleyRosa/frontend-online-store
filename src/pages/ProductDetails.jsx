import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: [],
    cartList: [],
  }

  componentDidMount() {
    this.fetchProduct();
    this.cartListProps();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const returnFetch = await getProductFromId(id);
    this.setState({
      product: returnFetch,
    });
  }

  cartListProps = () => {
    const { location: { state: { cart } } } = this.props;
    this.setState({
      cartList: cart,
    });
  }

  render() {
    const { product, cartList } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ product.title }</h1>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h3 data-testid="product-detail-price">{ product.price }</h3>
        <Link
          to={ {
            pathname: '/shoppingcart',
            state: {
              cart: [...cartList],
            },
          } }
          data-testid="shopping-cart-button"
        >
          <button type="button">
            Ir ao carrinho
          </button>
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf,
    }),
  }).isRequired,
};

export default ProductDetails;
