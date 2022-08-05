import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
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

  render() {
    const { categories } = this.state;
    return (
      <main>
        <div>
          <Link data-testid="shopping-cart-button" to="./shoppingcart">
            <button type="button">
              Shopping Cart
            </button>
          </Link>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        </div>
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
