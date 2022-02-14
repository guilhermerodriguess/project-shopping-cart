const save = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function clearCart() {
  const buttonClear = document.querySelector('.empty-cart');

  buttonClear.addEventListener('click', () => {
    save.innerHTML = '';
  });
}

async function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  return li;
}

async function addCarItem(id) {
  const products = await fetchItem(id);
  const addCart = save;
  const obj = {
    sku: products.id,
    name: products.title,
    salePrice: products.price,
    image: products.thumbnail,
  };
  addCart.appendChild(createCartItemElement(obj));
}

async function createProductItem() {
  const productList = document.querySelector('.items');
  loading(productList);
  const products = await fetchProducts('computador');

  return products.results.forEach((product, index) => {
    const obj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    
    productList.appendChild(createProductItemElement(obj));
    const buttonAddCart = document.querySelectorAll('.item__add');
    buttonAddCart[index].addEventListener('click', () => addCarItem(obj.sku));
  });
}

function loading(element) {
  const screenLoading = createCustomElement('div', 'loading', 'Loading');
  element.appendChild(screenLoading);
}

window.onload = () => {
  createProductItem();
  save.innerHTML = getSavedCartItems('cartItems');
  document.onclick = () => saveCartItems('cartItems', save.innerHTML);
  clearCart();
};
