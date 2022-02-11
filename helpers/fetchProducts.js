const fetchProducts = async (product) => {
  try {
    if (!product) { throw new Error('You must provide an url'); }
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

    const fetchAPI = await fetch(API_URL).then((response) =>
      response.json().then((data) => data));

    return fetchAPI;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
