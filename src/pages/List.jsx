import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.requestApi();
  }

  requestApi = async () => {
    const requestList = await getCategories();
    this.setState({ categories: requestList });
  }

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => ({
      inputText: value,
      filteredProducts: [],
    }));
  }

  fetchApi = async () => {
    const { inputText } = this.state;
    const returnFetch = await getProductsFromCategoryAndQuery(inputText);
    this.setState({
      filteredProducts: returnFetch.results,
    });
  }

  render() {
    const { inputText, filteredProducts, categories } = this.state;
    console.log(filteredProducts);
    return (
      <main>
        <Link data-testid="shopping-cart-button" to="./shoppingcart">
          <button type="button">
            Shopping Cart
          </button>
        </Link>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <input
          type="text"
          name="inputText"
          value={ inputText }
          data-testid="query-input"
          onChange={ this.onHandleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.fetchApi }
        >
          Chamar API
        </button>
        {filteredProducts !== undefined && filteredProducts.length !== 0
          ? filteredProducts.map((product) => (
            <section key={ product.id } data-testid="product">
              <h3>{product.title}</h3>
              <img
                src={ product.thumbnail }
                alt={ product.title }
              />
              <h4>{ product.price }</h4>
            </section>
          )) : <p>Nenhum produto foi encontrado</p>}
        <form>
          { categories.map((categorie) => (
            <label key={ categorie.id } data-testid="category" htmlFor="radio">
              <input type="radio" name="radio" value={ categorie.name } />
              { categorie.name }
            </label>
          )) }
        </form>
      </main>
    );
  }
}
