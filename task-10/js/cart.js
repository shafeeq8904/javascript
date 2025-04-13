import { updateCartCount } from '../js/products.js';
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalContainer.textContent = '';
      return;
    }

    let total = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
      total += item.quantity * (item.price || 0); 
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div>Quantity: ${item.quantity}</div>
          </div>
          <div>₹ ${item.price * item.quantity}</div>
        </div>
      `;
    }).join('');

    cartTotalContainer.textContent = `Total: ₹ ${total.toFixed(2)}`;
  });

  document.addEventListener('DOMContentLoaded', () => {
  updateCartCount(); 


  const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to the homepage
    });
 
});

