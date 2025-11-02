// Product Data Array
const products = [
    { 
        id: 1, name: "Fresh COW Milk", category: "groceries", price: 59, 
        description: "Pure, fresh cow milk - 1 liter. Rich in calcium and vitamins, perfect for daily consumption.", 
        image: "image/pexels-matthiaszomer-422202.jpg"
    },
    { 
        id: 3, name: "Fresh Buffalo Milk", category: "groceries", price: 70, 
        description: "Pure, fresh fullcream milk - 1 liter. Rich in calcium and vitamins, perfect for daily consumption.", image:"image/pexels-hsapir-1054650.jpg"
    },
    {
        id: 4, name: "Whole Wheat Bread", category: "groceries", price: 45, 
        description: "Freshly baked whole wheat bread - 400g. Made with natural ingredients, no preservatives.", image: "image/pexels-catscoming-920220.jpg"
    },
    {
        id: 5, name: "Eggs (Dozen)", category: "groceries", price: 80, 
        description: "Farm fresh eggs - 12 pieces. Rich in protein and essential nutrients.", image: "image/pexels-daniel-reche-718241-1556707.jpg"
    },
    {
        id: 6, name: "Basmati Rice", category: "groceries", price: 120, 
        description: "Premium Basmati rice - 1kg. Long grain, aromatic, perfect for daily meals.", image: "image/pexels-polina-tankilevitch-4110251.jpg"
    },
    {
        id: 7, name: "Cooking Oil", category: "groceries", price: 180, 
        description: "Refined sunflower oil - 1 liter. Healthy cooking oil for everyday use.", image: "image/pexels-rethaferguson-3621225.jpg"
    },
    {
        id: 8, name: "Sugar", category: "groceries", price: 50, 
        description: "Pure white sugar - 1kg. Free-flowing, perfect for daily cooking needs.",
        image: "image/pexels-castorlystock-3693297.jpg"
    },
    {
        id: 9, name: "Salt", category: "groceries", price: 40, 
        description: "Iodized salt - 1kg. Essential for daily cooking and food preservation.", image: "image/pexels-lorena-martinez-1218850-2320244.jpg"
    },
    {
        id: 10, name: "Toothpaste", category: "hygiene", price: 95, 
        description: "Fluoride toothpaste - 100g. For complete oral care and fresh breath.", image: "image/pexels-karola-g-4465814.jpg"
    },
    {
        id: 11, name: "Shampoo", category: "hygiene", price: 150, 
        description: "Nourishing shampoo - 400ml. Gentle on hair, leaves it soft and manageable.", image: "image/pexels-cup-of-couple-8015781.jpg"
    },
    {
        id: 12, name: "Soap Bar", category: "hygiene", price: 35, 
        description: "Natural soap bar - 100g. Cleanses and moisturizes skin naturally.", image: "image/pexels-mikhail-nilov-7814804.jpg"
    },
    {
        id: 13, name: "Toilet Paper", category: "hygiene", price: 120, 
        description: "Soft toilet paper - 4 rolls. Ultra-soft and absorbent for comfort.", image: "image/pexels-vlada-karpovich-3958203.jpg"
    },
    {
        id: 14, name: "Hand Sanitizer", category: "hygiene", price: 55, 
        description: "Alcohol-based hand sanitizer - 250ml. Kills 99.9% of germs instantly.", image: "image/pexels-shvetsa-3962332.jpg"
    },
    {
        id: 15, name: "Liquid Dish Soap", category: "household", price: 75, 
        description: "Liquid dish soap - 500ml. Cuts through grease and removes tough stains.", image: "image/pexels-karola-g-4239104.jpg"
    },
    {
        id: 16, name: "Laundry Detergent", category: "household", price: 187, 
        description: "Powerful laundry detergent - 1kg. Removes stains and keeps clothes fresh.", image: "image/pexels-markus-winkler-1430818-13768941.jpg"
    },
    {
        id: 17, name: "Trash Bags", category: "household", price: 90, 
        description: "Heavy-duty trash bags - 20 pieces. Leak-proof and tear-resistant.", image: "image/pexels-cottonbro-3738194.jpg"
    },
    {
        id: 18, name: "Batteries", category: "household", price: 140, 
        description: "AA batteries - 4 pack. Long-lasting power for everyday devices.", image: "image/pexels-moh-adbelghaffar-1084213.jpg"
    },
    {
        id: 19, name: "Tea", category: "beverages", price: 40 ,
        description: "Premium tea leaves - 250g. Rich flavor and aroma for the perfect cup.", image: "image/pexels-minan1398-1629185.jpg"
    },
    {
        id: 20, name: "Coffee pouch", category: "beverages", price: 10 , 
        description: "Ground coffee - 200g. Bold and aromatic, perfect for morning boost.", image: "image/pexels-minan1398-1629185.jpg"
    },
    {
        id: 21, name: "Desi Mosambi ka Juice", category: "beverages", price: 100, 
        description: "Fresh mosambi juice - 1 liter. 100% pure, no added sugar.", image: "image/pexels-charlotte-may-5947065.jpg"
    },
    {
        id: 22, name: "Beeeeslari", category: "beverages", price: 20, 
        description: "Pure mineral water - 1 liter. Clean, refreshing, and essential for hydration.", image: "image/pexels-steve-1000084.jpg"
    }
];

// Cart State and DOM Elements
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// --- HELPER FUNCTION: Correctly renders the product image as an <img> tag ---
function getImageHtml(product) {
    if (product.image && (product.image.includes('/') || product.image.includes('.'))) {
        // We assume 'image/' is the correct relative path. 
        // We use the class 'actual-product-img' for styling the image element.
        return `<img src="${product.image}" alt="${product.name}" class="actual-product-img">`;
    }
    // Fallback if image property is not a file path (e.g., if it were an emoji)
    return product.image || ''; 
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // UI Interactions
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', handleCheckout);
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });

    // Category filters
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Render Products (Uses getImageHtml)
function renderProducts() {
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    productsGrid.innerHTML = filteredProducts.map(product => {
        
        // Correctly injects the <img> tag
        const imageContent = getImageHtml(product);

        return `
            <div class="product-card" onclick="openProductModal(${product.id})">
                <div class="product-image">${imageContent}</div> 
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-footer">
                        <div class="product-price">₹${product.price}</div>
                        <!-- IMPORTANT: event.stopPropagation() prevents the product-card onclick from firing -->
                        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Update Cart UI (Uses getImageHtml)
function updateCartUI() {
    // Correctly computes total count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Correctly computes total price (Accumulation logic is fine here)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <!-- FIX: Uses getImageHtml for correct image rendering -->
                <div class="cart-item-image">${getImageHtml(item)}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} each</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Open/Close Cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Product Modal (Uses getImageHtml)
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    
    // FIX: Uses getImageHtml for correct image rendering
    modalBody.innerHTML = `
        <div class="modal-product-image">${getImageHtml(product)}</div>
        <div class="modal-product-info">
            <div class="modal-product-category">${product.category}</div>
            <h2>${product.name}</h2>
            <div class="modal-product-price">₹${product.price}</div>
            <div class="modal-product-description">${product.description}</div>
            <button class="btn btn-secondary modal-add-to-cart" onclick="addToCart(${product.id}); closeProductModal();">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        // Changed alert() to a call to showNotification() for better UX
        showNotification('Your cart is empty!', 'error'); 
        return;
    }

    // Close cart and redirect to checkout page
    closeCartSidebar();
    window.location.href = 'checkout.html';
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Notification (Modified to accept type/color if needed)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    // Set colors based on type
    const bgColor = type === 'error' ? '#f44336' : 'var(--primary-color)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Animation styles for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
