let allProducts = [];


export async function loadProducts() {
  try {
    const res = await fetch('./data.json');
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

export function filterProducts(searchTerm) {
  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
  if (filtered.length === 0) {
    document.querySelector('.products-container').innerHTML = `
      <div class="no-products-message"> No products found for "${searchTerm}"</div>
    `;
  } else {
    renderProducts(filtered);
  }
}

function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>$${product.price.toFixed(2)}</strong>
      <button class="addbutton" data-id="${product.id}">Add to Cart</button>
    </div>
  `).join('');

  document.querySelectorAll('.addbutton').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      const product = allProducts.find(p => p.id == productId);
      if (product) addToCart(product);
    });
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
  });
  
