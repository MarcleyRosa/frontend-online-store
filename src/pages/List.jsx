import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      categories: [],
      filteredProducts: [],
      shoppingCart: [],
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

  fetchQueryOrCategoryId = async () => {
    const { inputText } = this.state;
    if (inputText.includes('MLB')) {
      const returnFetch = await getProductsFromCategoryAndQuery(inputText, undefined);
      this.setState({
        filteredProducts: returnFetch.results,
      });
    }
    const returnFetch = await getProductsFromCategoryAndQuery(undefined, inputText);
    this.setState({
      filteredProducts: returnFetch.results,
    });
  }

  fetchCategoryButton = async (categorie) => {
    const fetchCategory = await getProductsFromCategoryAndQuery(categorie, undefined);
    this.setState({
      filteredProducts: fetchCategory.results,
    });
  }

  addShoppingCart = (product) => {
    this.setState((prevState) => ({
      shoppingCart: [...prevState.shoppingCart, product],
    }));
  }

  render() {
    const { inputText, filteredProducts, categories, shoppingCart } = this.state;
    return (
      <main>
        {/* botão de ir ao carrinho */}
        <Link
          data-testid="shopping-cart-button"
          to={ {
            pathname: '/shoppingcart',
            state: {
              cart: [...shoppingCart],
            },
          } }
        >
          <button type="button">
            Ir ao carrinho
          </button>
        </Link>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        {/* input de busca */}
        <input
          type="text"
          name="inputText"
          value={ inputText }
          data-testid="query-input"
          onChange={ this.onHandleChange }
        />
        {/* botão de busca */}
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.fetchQueryOrCategoryId(inputText) }
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
              <Link
                to={ {
                  pathname: `/product-details/${product.id}`,
                  state: {
                    cart: [...shoppingCart],
                  },
                } }
                data-testid="product-detail-link"
              >
                Mais detalhes sobre o produto
              </Link>
              <br />
              <br />
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.addShoppingCart(product) }
              >
                Adicionar ao carrinho
              </button>
            </section>
          )) : <p>Nenhum produto foi encontrado</p>}
        <form>
          { categories.map((categorie) => (
            <label
              key={ categorie.id }
              data-testid="category"
              htmlFor={ categorie.id }
            >
              <input
                type="radio"
                name="radio"
                value={ categorie.name }
                id={ categorie.id }
                onChange={ () => this.fetchCategoryButton(categorie.id) }
              />
              { categorie.name }
            </label>
          )) }
        </form>
      </main>
    );
  }
}
