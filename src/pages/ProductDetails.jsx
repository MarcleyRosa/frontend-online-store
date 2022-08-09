/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = this.props;
    this.state = {
      comments: JSON.parse(localStorage.getItem(id)) || [],
      product: [],
      cartList: [],
      validEmail: true,
    };
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
    event.preventDefault();
    console.log(event.target);
    const { email, rating, textarea } = this.state;
    const { match: { params: { id } } } = this.props;
    const object = { email, rating, textarea };
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/g;
    const emailValidation = emailRegex.test(email);
    if (emailValidation && Number(rating) > 0) {
      this.setState((prevState) => ({
        comments: [...prevState.comments, object],
        validEmail: emailValidation,
      }), () => {
        const { comments } = this.state;
        localStorage.setItem(`${id}`, JSON.stringify(comments));
        event.target.reset();
      });
    } else {
      this.setState({
        validEmail: false,
      });
    }
  };

  render() {
    const { product, cartList, comments, validEmail } = this.state;
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
        <form onSubmit={ this.handleClickSubmit }>
          <input
            type="email"
            name="email"
            data-testid="product-detail-email"
            onChange={ this.handleChange }
            required
            value={ comments.email }
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
          >
            Avaliar
          </button>
        </form>
        { !validEmail && <h3 data-testid="error-msg">Campos inválidos</h3> }
        { comments.map((comment, index) => (
          <section key={ index }>
            <h1 data-testid="review-card-email">{ comment.email }</h1>
            <h2 data-testid="review-card-rating">{ comment.textarea }</h2>
            <h3 data-testid="review-card-evaluation">{ comment.rating }</h3>
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
