import { updateCartCount } from '../js/products.js';
document.addEventListener('DOMContentLoaded', () => {

    updateCartCount(); 
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      cartTotalContainer.textContent = '';
      return;
    }

    let total = 0;

    cartItemsContainer.innerHTML = cart.map((item, index) => {
      total += item.quantity * (item.price || 0); 
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div>Quantity: ${item.quantity}</div>
            <div>Price: ₹${item.price}</div>
            <div>₹ ${item.price * item.quantity}</div>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
          
        </div>
      `;
    }).join('');

    cartTotalContainer.innerHTML =  `
    <h2>Total: ₹${total.toFixed(2)}</h2>
  `;

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  });

