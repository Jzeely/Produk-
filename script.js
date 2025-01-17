// Array of Products
const products = [
    { id: 1, name: 'sepatu olahraga', price: 100000, image: 'ss1.png', description: 'Deskripsi lengkap produk A.' },
    { id: 2, name: 'nike air force one', price: 150000, image: 'ss2.png', description: 'Deskripsi lengkap produk B.' },
    { id: 3, name: 'sepatu adadas', price: 200000, image: 'ss3.png', description: 'Deskripsi lengkap produk C.' },
    { id: 4, name: 'sepatu basket', price: 250000, image: 'ss4.png', description: 'Deskripsi lengkap produk D.' },
    { id: 5, name: 'patrobas high', price: 300000, image: 'ss5.png', description: 'Deskripsi lengkap produk E.' },
    { id: 6, name: 'ventela high', price: 350000, image: 'ss6.png', description: 'Deskripsi lengkap produk F.' },
    { id: 7, name: 'samba', price: 400000, image: 'ss10.png', description: 'Deskripsi lengkap produk G.' },
    { id: 8, name: 'new balance', price: 450000, image: 'ss7.png', description: 'Deskripsi lengkap produk H.' },
    { id: 9, name: 'mills running', price: 500000, image: 'ss8.png', description: 'Deskripsi lengkap produk I.' },
    { id: 10, name: 'running shoes', price: 550000, image: 'ss9.png', description: 'Deskripsi lengkap produk J.' },
  ];
  
  let cart = [];
  let currentPage = 1;
  const productsPerPage = 4;
  
  // Function to update cart display
  function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
  
    // Clear cart items display
    cartItems.innerHTML = '';
  
    // Add cart items to the display
    let totalPrice = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>Rp ${item.price}</span>
        <button onclick="removeFromCart(${item.id})">Hapus</button>
      `;
      cartItems.appendChild(cartItem);
      totalPrice += item.price;
    });
  
    // Update total price
    cartTotalPrice.innerText = `Rp ${totalPrice.toLocaleString()}`;
    cartCount.innerText = cart.length;
  
    // Enable/Disable checkout button
    checkoutButton.disabled = cart.length === 0;
  }
  
  // Function to remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Function to render products
  function renderProducts() {
    const productList = document.getElementById('product-list');
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
  
    productList.innerHTML = '';
    currentProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">Rp ${product.price}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
      `;
      productList.appendChild(productElement);
    });
    
    renderPagination();
  }
  
  // Function to add product to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
  }
  
  // Function to render pagination
  function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
    }
    pagination.innerHTML = paginationHTML;
  }
  
  // Function to go to a specific page
  function goToPage(page) {
    currentPage = page;
    renderProducts();
  }
  
  // Function to handle search functionality
  function searchProducts() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">Rp ${product.price}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
      `;
      productList.appendChild(productElement);
    });
    renderPagination();
  }
  
  // Initialize the page
  renderProducts();
  updateCart();
  