import { loadProducts } from './products.js';
import { filterProducts } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

document.querySelector('.cart-icon').addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    filterProducts(query);
  });