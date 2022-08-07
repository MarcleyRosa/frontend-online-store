/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const returnFetch = await getProductFromId(id);
    this.setState({
      title: returnFetch.title,
      thumbnail: returnFetch.thumbnail,
      price: returnFetch.price,
    });
  }

  render() {
    const { title, thumbnail, price } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ title }</h1>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <h3 data-testid="product-detail-price">{ price }</h3>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button">
            Ir ao carrinho
          </button>
        </Link>
      </div>
    );
  }
}

export default ProductDetails;
