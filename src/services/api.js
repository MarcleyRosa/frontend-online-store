export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId) {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const response = await request.json();
    return response;
  }
  if (query) {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${query}`);
    const response = await request.json();
    return response;
  }
}
