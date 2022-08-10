const PRODUCTS_STORAGE = 'storaged-products';

function catchStorage() {
  return JSON.parse(localStorage.getItem(PRODUCTS_STORAGE) || '[]');
}

function modifyStorage(data) {
  return localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(data));
}

function getStorage() {
  return catchStorage();
}

function addProduct(product) {
  const products = catchStorage();
  const isAlreadyProduct = products.find(({ id }) => id === product.id);
  if (isAlreadyProduct) {
    modifyStorage(
      products.map((currentProduct) => ({
        ...product,
        length:
        currentProduct.id === product.id
          ? currentProduct.length + 1
          : currentProduct.length,
      })),
    );
    return;
  }
  modifyStorage([...products, { ...product, length: 1 }]);
}

function removeProduct(id) {
  const products = catchStorage();
  modifyStorage(products.filter((product) => product.id !== id));
}

function reduceFunc(array) {
  return array.reduce((acc, curr) => (
    acc + curr.length
  ), 0);
}

export {
  getStorage,
  addProduct,
  removeProduct,
  reduceFunc,
};
