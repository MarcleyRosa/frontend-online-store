export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let URL = '';
  if (categoryId) {
    URL = `https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}`;
  } else if (query) {
    URL = `https://api.mercadolibre.com/sites/MLB/search?category=${query}`;
  } else {
    URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }
  const request = await fetch(URL);
  const response = await request.json();
  return response;
}
