export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (!categoryId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const queryResponse = await fetch(url).then((response) => response.json());
    return queryResponse;
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const idResponse = await fetch(url).then((response) => response.json());
  return idResponse;
}

export async function getProductFromId(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const productResponse = await fetch(url).then((response) => response.json());
  return productResponse;
}
