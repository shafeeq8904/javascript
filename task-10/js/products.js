export async function loadProducts() {
    try {
      const res = await fetch('./data.json');
      const products = await res.json();
      const container = document.getElementById('product-list');
  
      container.innerHTML = products.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <strong>$${product.price.toFixed(2)}</strong>
          <button class="addbutton">Add to Cart</button>
        </div>
      `).join('');
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }
  