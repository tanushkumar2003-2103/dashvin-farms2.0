/**
 * DASHVIN FARMS — Shopping Cart State & Drawer Logic
 * Pure Frontend Demo with LocalStorage Persistence
 */

const DashvinCart = (function() {
  const STORAGE_KEY = 'dashvin_cart_items';
  let cart = [];
  let discountCode = '';
  let discountPercent = 0;

  // Load from localStorage
  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        cart = JSON.parse(data);
      } else {
        // Sample default item for immediate demo delight
        cart = [
          { id: 'milk-a2', qty: 2 },
          { id: 'ghee-bilona', qty: 1 }
        ];
        saveCart();
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
    updateUI();
  }

  function addItem(productId, qty = 1) {
    const parsedQty = parseInt(qty, 10) || 1;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += parsedQty;
    } else {
      cart.push({ id: productId, qty: parsedQty });
    }
    saveCart();
    showToast(`Added to cart: ${getProduct(productId)?.name || 'Product'}`);
  }

  function updateQty(productId, newQty) {
    const qty = parseInt(newQty, 10);
    if (qty <= 0) {
      removeItem(productId);
    } else {
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.qty = qty;
        saveCart();
      }
    }
  }

  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showToast('Item removed from cart');
  }

  function clearCart() {
    cart = [];
    discountCode = '';
    discountPercent = 0;
    saveCart();
  }

  function getProduct(productId) {
    if (typeof DASHVIN_PRODUCTS !== 'undefined') {
      return DASHVIN_PRODUCTS.find(p => p.id === productId);
    }
    return null;
  }

  function calculateSubtotal() {
    return cart.reduce((total, item) => {
      const prod = getProduct(item.id);
      return total + (prod ? prod.price * item.qty : 0);
    }, 0);
  }

  function getCartCount() {
    return cart.reduce((total, item) => total + item.qty, 0);
  }

  function updateUI() {
    const count = getCartCount();
    const subtotal = calculateSubtotal();
    const threshold = 350; // Free delivery threshold in ₹

    // Update badges
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update drawer item count
    const headerCount = document.querySelector('.cart-header-count');
    if (headerCount) {
      headerCount.textContent = `(${count} item${count !== 1 ? 's' : ''})`;
    }

    // Update delivery progress
    const progressFill = document.querySelector('.delivery-progress-fill');
    const deliveryText = document.querySelector('.delivery-status-text');
    if (progressFill && deliveryText) {
      if (subtotal >= threshold) {
        progressFill.style.width = '100%';
        progressFill.style.backgroundColor = '#4ADE80';
        deliveryText.innerHTML = `<strong>🎉 You qualify for FREE Farm Morning Delivery!</strong>`;
      } else {
        const percent = Math.min(100, Math.round((subtotal / threshold) * 100));
        progressFill.style.width = `${percent}%`;
        progressFill.style.backgroundColor = 'var(--color-primary)';
        const remaining = threshold - subtotal;
        deliveryText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Morning Delivery</strong>`;
      }
    }

    // Render items list
    const itemsContainer = document.querySelector('.cart-items');
    const emptyState = document.querySelector('.cart-empty-state');
    const cartFooter = document.querySelector('.cart-footer');

    if (itemsContainer) {
      if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (cartFooter) cartFooter.style.display = 'none';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'flex';

        let html = '';
        cart.forEach(item => {
          const product = getProduct(item.id);
          if (!product) return;
          const itemTotal = product.price * item.qty;

          html += `
            <div class="cart-item" data-id="${product.id}">
              <img src="${product.image}" alt="${product.name}" class="cart-item-img">
              <div class="cart-item-details">
                <h4 class="cart-item-title">${product.name}</h4>
                <div class="cart-item-price">₹${product.price} <span style="font-size:0.75rem; color:var(--color-muted);">/ ${product.unit}</span></div>
                <div class="cart-item-controls">
                  <div class="qty-control">
                    <button class="qty-btn cart-qty-decrease" data-id="${product.id}">−</button>
                    <span class="qty-input">${item.qty}</span>
                    <button class="qty-btn cart-qty-increase" data-id="${product.id}">+</button>
                  </div>
                  <button class="cart-item-remove" data-id="${product.id}">Remove</button>
                </div>
              </div>
            </div>
          `;
        });
        itemsContainer.innerHTML = html;
      }
    }

    // Update totals
    const subtotalEl = document.querySelector('.cart-subtotal-amount');
    if (subtotalEl) {
      let finalTotal = subtotal;
      if (discountPercent > 0) {
        finalTotal = subtotal * (1 - discountPercent / 100);
      }
      subtotalEl.textContent = `₹${Math.round(finalTotal)}`;
    }
  }

  function openCart() {
    const backdrop = document.querySelector('.cart-backdrop');
    const drawer = document.querySelector('.cart-drawer');
    if (backdrop && drawer) {
      backdrop.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    const backdrop = document.querySelector('.cart-backdrop');
    const drawer = document.querySelector('.cart-drawer');
    if (backdrop && drawer) {
      backdrop.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyCoupon(code) {
    const clean = code.trim().toUpperCase();
    if (clean === 'DASHVIN10' || clean === 'FARMFRESH') {
      discountCode = clean;
      discountPercent = 10;
      updateUI();
      showToast('10% Farm Fresh Coupon Applied!');
      return true;
    } else {
      showToast('Invalid coupon code. Try DASHVIN10');
      return false;
    }
  }

  // Toast notification helper
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  return {
    init: function() {
      loadCart();
      updateUI();

      // Cart open triggers
      document.querySelectorAll('.open-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openCart();
        });
      });

      // Cart close triggers
      const closeBtn = document.querySelector('.cart-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeCart);
      const backdrop = document.querySelector('.cart-backdrop');
      if (backdrop) backdrop.addEventListener('click', closeCart);

      // Event delegation for cart item qty and remove
      const itemsContainer = document.querySelector('.cart-items');
      if (itemsContainer) {
        itemsContainer.addEventListener('click', (e) => {
          const decBtn = e.target.closest('.cart-qty-decrease');
          const incBtn = e.target.closest('.cart-qty-increase');
          const remBtn = e.target.closest('.cart-item-remove');

          if (decBtn) {
            const id = decBtn.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) updateQty(id, item.qty - 1);
          } else if (incBtn) {
            const id = incBtn.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) updateQty(id, item.qty + 1);
          } else if (remBtn) {
            const id = remBtn.dataset.id;
            removeItem(id);
          }
        });
      }

      // Checkout proceed button in cart
      const proceedBtn = document.querySelector('.cart-checkout-btn');
      if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
          closeCart();
          if (typeof openCheckoutModal === 'function') {
            openCheckoutModal();
          } else {
            window.location.href = 'checkout.html';
          }
        });
      }
    },
    addItem,
    updateQty,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    applyCoupon,
    showToast,
    getCart: () => cart,
    calculateSubtotal
  };
})();
