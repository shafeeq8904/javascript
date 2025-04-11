import { loadProducts } from './products.js';
import { filterProducts } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    filterProducts(query);
  });