const fetchItem = async (id) => {
  try {
    if (!id) { throw new Error('You must provide an url'); }

    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const data = response.json();

    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
