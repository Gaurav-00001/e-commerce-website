const products = [
    { 
        id: 1, name: "Fresh COW Milk", category: "groceries", price: 59, 
        description: "Pure, fresh cow milk - 1 liter. Rich in calcium and vitamins, perfect for daily consumption.", image: "🐄"
    },
    
    { 
        id: 3, name: "Fresh Buffalo Milk", category: "groceries", price: 70, 
        description: "Pure, fresh fullcream milk - 1 liter. Rich in calcium and vitamins, perfect for daily consumption.", image: "🐃"
    },
    {
        id: 4, name: "Whole Wheat Bread", category: "groceries", price: 45, 
        description: "Freshly baked whole wheat bread - 400g. Made with natural ingredients, no preservatives.", image: "🍞"
    },
    {
        id: 5, name: "Eggs (Dozen)", category: "groceries", price: 80, 
        description: "Farm fresh eggs - 12 pieces. Rich in protein and essential nutrients.", image: "🥚"
    },
    {
        id: 6, name: "Basmati Rice", category: "groceries", price: 120, 
        description: "Premium Basmati rice - 1kg. Long grain, aromatic, perfect for daily meals.", image: "🍚"
    },
    {
        id: 7, name: "Cooking Oil", category: "groceries", price: 180, 
        description: "Refined sunflower oil - 1 liter. Healthy cooking oil for everyday use.", image: "🛢️"
    },
    {
        id: 8, name: "Sugar", category: "groceries", price: 50, 
        description: "Pure white sugar - 1kg. Free-flowing, perfect for daily cooking needs.", image: "◽"
    },
    {
        id: 9, name: "Salt", category: "groceries", price: 40, 
        description: "Iodized salt - 1kg. Essential for daily cooking and food preservation.", image: "🧂"
    },
    {
        id: 10, name: "Toothpaste", category: "hygiene", price: 95, 
        description: "Fluoride toothpaste - 100g. For complete oral care and fresh breath.", image: "🪥🦷"
    },
    {
        id: 11, name: "Shampoo", category: "hygiene", price: 150, 
        description: "Nourishing shampoo - 400ml. Gentle on hair, leaves it soft and manageable.", image: "🧴"
    },
    {
        id: 12, name: "Soap Bar", category: "hygiene", price: 35, 
        description: "Natural soap bar - 100g. Cleanses and moisturizes skin naturally.", image: "🧼"
    },
    {
        id: 13, name: "Toilet Paper", category: "hygiene", price: 120, 
        description: "Soft toilet paper - 4 rolls. Ultra-soft and absorbent for comfort.", image: "🧻"
    },
    {
        id: 14, name: "Hand Sanitizer", category: "hygiene", price: 55, 
        description: "Alcohol-based hand sanitizer - 250ml. Kills 99.9% of germs instantly.", image: "🧴"
    },
    {
        id: 15, name: "Liquid Dish Soap", category: "household", price: 75, 
        description: "Liquid dish soap - 500ml. Cuts through grease and removes tough stains.", image: "🧽"
    },
    {
        id: 16, name: "Laundry Detergent", category: "household", price: 187, 
        description: "Powerful laundry detergent - 1kg. Removes stains and keeps clothes fresh.", image: "🧺"
    },
    {
        id: 17, name: "Trash Bags", category: "household", price: 90, 
        description: "Heavy-duty trash bags - 20 pieces. Leak-proof and tear-resistant.", image: "🗑️"
    },
    {
        id: 18, name: "Batteries", category: "household", price: 140, 
        description: "AA batteries - 4 pack. Long-lasting power for everyday devices.", image: "🔋"
    },
    {
        id: 19, name: "Tea", category: "beverages", price: 40 ,
        description: "Premium tea leaves - 250g. Rich flavor and aroma for the perfect cup.", image: "🍵"
    },
    {
        id: 20, name: "Coffee pouch", category: "beverages", price: 10 , 
        description: "Ground coffee - 200g. Bold and aromatic, perfect for morning boost.", image: "☕"
    },
    {
        id: 21, name: "Desi Mosambi ka Juice", category: "beverages", price: 100, 
        description: "Fresh mosambi juice - 1 liter. 100% pure, no added sugar.", image: "🍊"
    },
    {
        id: 22, name: "Beeeeslari", category: "beverages", price: 20, 
        description: "Pure mineral water - 1 liter. Clean, refreshing, and essential for hydration.", image: "💧"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';

// --- DOM References ---
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

// New Checkout Modal References
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const checkoutSummary = document.getElementById('checkoutSummary');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const cardDetailsForm = document.getElementById('cardDetailsForm');
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardNumberInput = document.getElementById('cardNumber');
const cardExpiryInput = document.getElementById('cardExpiry');
const cardCVVInput = document.getElementById('cardCVV');


document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

function setupEventListeners() {
    // Basic UI listeners
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });

    // Checkout Modal Listeners (NEW)
    checkoutBtn.addEventListener('click', handleCheckout); // Calls the function to open the modal
    closeCheckoutModal.addEventListener('click', closeCheckoutModalHandler);
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModalHandler();
    });
    confirmPaymentBtn.addEventListener('click', processPayment);

    // Payment Method Toggle (NEW)
    paymentOptions.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'card') {
                cardDetailsForm.style.display = 'block';
            } else {
                cardDetailsForm.style.display = 'none';
            }
        });
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

    // Smooth scroll for navigation links (Omitted for brevity, assuming standard implementation)
}

// --- Core Cart Logic (Unchanged) ---
function renderProducts() {
    const filteredProducts = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">₹${product.price}</div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (!product) { console.error(`Product with ID ${productId} not found.`); return; }
    if (existingItem) { existingItem.quantity += 1; } else { cart.push({ ...product, quantity: 1 }); }
    saveCart(); updateCartUI(); showNotification(`${product.name} added to cart!`);
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(); updateCartUI();
}
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) { removeFromCart(productId); } 
        else { saveCart(); updateCartUI(); }
    }
}
function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} each</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// --- UI Modals (Unchanged) ---
function openCart() {
    cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closeCartSidebar() {
    cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); document.body.style.overflow = '';
}
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) { console.error(`Product with ID ${productId} not found for modal.`); return; }
    modalBody.innerHTML = `
        <div class="modal-product-image">${product.image}</div>
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
    productModal.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closeProductModal() {
    productModal.classList.remove('active'); document.body.style.overflow = '';
}

// ------------------------------------------------------------------
// NEW CHECKOUT/PAYMENT LOGIC
// ------------------------------------------------------------------

// MODIFIED: Opens the custom checkout modal and populates summary
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalFixed = total.toFixed(2);
    
    // 1. Build Summary HTML
    let summaryHTML = '';
    cart.forEach(item => {
        summaryHTML += `
            <div>
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    summaryHTML += `<div class="summary-total"><span>Total</span><span>₹${totalFixed}</span></div>`;

    checkoutSummary.innerHTML = summaryHTML;
    confirmPaymentBtn.textContent = `Pay ₹${totalFixed}`;
    
    // 2. Open Modal
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModalHandler() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form elements
    document.getElementById('cod').checked = true;
    cardDetailsForm.style.display = 'none';
    cardNumberInput.value = '';
    cardExpiryInput.value = '';
    cardCVVInput.value = '';
}

function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment"]:checked').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalFixed = total.toFixed(2);

    if (selectedMethod === 'cod') {
        // Cash on Delivery
        alert(`✅ Order confirmed for ₹${totalFixed}. You selected Cash on Delivery (COD).`);
        finalizeOrder();
    } 
    
    else if (selectedMethod === 'card') {
        // Simulated Card Payment - Validate form fields
        const cardNumber = cardNumberInput.value.trim();
        const cardExpiry = cardExpiryInput.value.trim();
        const cardCVV = cardCVVInput.value.trim();

        // Basic validation: 16 digits, non-empty expiry, min 3 digit CVV
        const isValidCard = cardNumber.length === 16 && !isNaN(cardNumber) && cardExpiry !== '' && cardCVV.length >= 3;

        if (isValidCard) {
            alert(`💳 Payment of ₹${totalFixed} successful! Your order is placed.`);
            finalizeOrder();
        } else {
            alert('❌ Please ensure card number (16 digits), expiry, and CVV are entered correctly.');
        }
    }
}

function finalizeOrder() {
    // 1. Clear the cart data
    cart = [];
    
    // 2. Persist the empty cart to local storage
    saveCart();
    
    // 3. Update the user interface & close modals
    updateCartUI();
    closeCartSidebar();
    closeCheckoutModalHandler(); 
    
    showNotification('Order placed successfully! Thank you for shopping!');
}

// Notification (Unchanged)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: var(--primary-color);
        color: white; padding: 1rem 2rem; border-radius: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 3000; animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles (CSS embedded in JS for notification)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);