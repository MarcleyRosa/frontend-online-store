import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  state = {
    comments: JSON.parse(localStorage.getItem('Formulario')) || [],
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

  addShoppingCart = (product) => {
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, product],
    }));
  }

  handleChange = ({ target: { name, value, type, checked } }) => {
    const newValue = type === 'checked' ? checked : value;
    this.setState({
      [name]: newValue,
    });
  };

  handleClickSubmit = (event) => {
    console.log(event.target);
    const { email, rating, textarea } = this.state;
    const object = { email, rating, textarea };
    this.setState((prevState) => ({
      comments: [...prevState.comments, object],
    }), () => {
      const { comments } = this.state;
      localStorage.setItem('Formulario', JSON.stringify(comments));
    });
  };

  render() {
    const { product, cartList, comments } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ product.title }</h1>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h3 data-testid="product-detail-price">{ product.price }</h3>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addShoppingCart(product) }
        >
          Adicionar ao carrinho
        </button>
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
        <form>
          <input
            type="email"
            name="email"
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            required
          />
          <label htmlFor="radio">
            <input
              type="radio"
              name="rating"
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="radio">
            <input
              type="radio"
              name="rating"
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="radio">
            <input
              type="radio"
              name="rating"
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="radio">
            <input
              type="radio"
              name="rating"
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="radio">
            <input
              type="radio"
              name="rating"
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            id=""
            cols="30"
            rows="10"
            name="textarea"
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
            id={ product.id }
            onClick={ this.handleClickSubmit }
          >
            Avaliar
          </button>
        </form>
        { comments.map((comment, index) => (
          <section key={ index }>
            <h1>{ comment.email }</h1>
            <h2>{ comment.textarea }</h2>
            <h3>{ comment.rating }</h3>
          </section>
        )) }
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
