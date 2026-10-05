/**
 * DASHVIN FARMS — Main Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Cart
  if (typeof DashvinCart !== 'undefined') {
    DashvinCart.init();
  }

  // 1. Navbar Glass-to-Cream Transition on Scroll
  const header = document.querySelector('.header');
  function handleNavScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 2. Mobile Menu Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let mobileBackdrop = document.querySelector('.mobile-backdrop');

  if (!mobileBackdrop) {
    mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'mobile-backdrop';
    document.body.appendChild(mobileBackdrop);
  }

  function toggleMobileMenu(open) {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    if (shouldOpen) {
      mobileToggle.classList.add('active');
      navMenu.classList.add('active');
      mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
    document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
  }

  // 3. Render & Filter Products in Home Page Grid
  const productsGrid = document.querySelector('.products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProducts(category = 'all') {
    if (!productsGrid || typeof DASHVIN_PRODUCTS === 'undefined') return;

    const filtered = category === 'all' 
      ? DASHVIN_PRODUCTS 
      : DASHVIN_PRODUCTS.filter(p => p.category === category);

    productsGrid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');

    // Reattach listeners for dynamically rendered cards
    attachProductCardListeners();
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category || 'all';
        renderProducts(cat);
      });
    });
    // Initial render
    renderProducts('all');
  }

  // 4. Attach Product Card Interactions
  function attachProductCardListeners() {
    // Quantity controls on card
    document.querySelectorAll('.product-card .qty-control').forEach(ctrl => {
      const decBtn = ctrl.querySelector('.qty-decrease');
      const incBtn = ctrl.querySelector('.qty-increase');
      const input = ctrl.querySelector('.qty-input');

      if (decBtn && incBtn && input) {
        decBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.textContent, 10) || 1;
          if (val > 1) input.textContent = val - 1;
        };
        incBtn.onclick = (e) => {
          e.stopPropagation();
          let val = parseInt(input.textContent, 10) || 1;
          if (val < 20) input.textContent = val + 1;
        };
      }
    });

    // Add to cart buttons
    document.querySelectorAll('.product-card .add-to-cart-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const card = btn.closest('.product-card');
        const qtyEl = card.querySelector('.qty-input');
        const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;

        if (typeof DashvinCart !== 'undefined') {
          DashvinCart.addItem(id, qty);
        }

        // Tactile bounce feedback
        btn.style.transform = 'scale(0.96)';
        setTimeout(() => { btn.style.transform = ''; }, 150);
      };
    });

    // Wishlist buttons
    document.querySelectorAll('.product-card .wishlist-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        btn.classList.toggle('wishlisted');
        const isW = btn.classList.contains('wishlisted');
        if (typeof DashvinCart !== 'undefined') {
          DashvinCart.showToast(isW ? 'Saved to your farm wishlist ❤️' : 'Removed from wishlist');
        }
      };
    });

    // Quick View buttons
    document.querySelectorAll('.product-quickview-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openQuickViewModal(id);
      };
    });
  }
  window.attachProductCardListeners = attachProductCardListeners;

  // 5. Quick View Modal
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewContent = document.getElementById('quickViewDetails');
  const quickViewClose = document.getElementById('quickViewClose');

  function openQuickViewModal(productId) {
    if (!quickViewModal || typeof DASHVIN_PRODUCTS === 'undefined') return;
    const prod = DASHVIN_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    quickViewContent.innerHTML = `
      <div class="quickview-img-wrap">
        <img src="${prod.image}" alt="${prod.name}">
      </div>
      <div class="quickview-details">
        <div class="eyebrow">${prod.badge}</div>
        <h2 class="heading-md" style="font-size:1.75rem;">${prod.name}</h2>
        <div class="product-rating" style="margin-bottom:0.25rem;">
          ${renderRatingStars(prod.rating)}
          <span class="product-rating-count">(${prod.reviewsCount} customer reviews)</span>
        </div>
        <div class="product-price" style="font-size:1.875rem; color:var(--color-primary);">₹${prod.price} <span style="font-size:0.875rem; color:var(--color-muted); font-family:var(--font-primary); font-weight:500;">/ ${prod.unit}</span></div>
        <p class="product-desc" style="font-size:0.9375rem; line-height:1.6;">${prod.fullDesc}</p>
        
        <div style="background:var(--color-sage-light); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--color-border); font-size:0.8125rem;">
          <strong style="color:var(--color-primary-dark); display:block; margin-bottom:0.35rem;">Farm Purity Highlights:</strong>
          <ul style="display:flex; flex-direction:column; gap:0.25rem; color:var(--color-muted);">
            ${prod.features.map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
        </div>

        <div style="display:flex; align-items:center; gap:1rem; margin-top:1rem;">
          <div class="qty-control">
            <button class="qty-btn" id="modalQtyDec">−</button>
            <span class="qty-input" id="modalQtyVal">1</span>
            <button class="qty-btn" id="modalQtyInc">+</button>
          </div>
          <button class="btn btn-primary" id="modalAddToCartBtn" style="flex-grow:1;">
            Add to Cart — ₹${prod.price}
          </button>
        </div>
      </div>
    `;

    // Hook modal controls
    const dec = quickViewContent.querySelector('#modalQtyDec');
    const inc = quickViewContent.querySelector('#modalQtyInc');
    const val = quickViewContent.querySelector('#modalQtyVal');
    const addBtn = quickViewContent.querySelector('#modalAddToCartBtn');

    dec.onclick = () => {
      let v = parseInt(val.textContent, 10);
      if (v > 1) {
        val.textContent = v - 1;
        addBtn.textContent = `Add to Cart — ₹${prod.price * (v - 1)}`;
      }
    };

    inc.onclick = () => {
      let v = parseInt(val.textContent, 10);
      if (v < 20) {
        val.textContent = v + 1;
        addBtn.textContent = `Add to Cart — ₹${prod.price * (v + 1)}`;
      }
    };

    addBtn.onclick = () => {
      const q = parseInt(val.textContent, 10);
      DashvinCart.addItem(prod.id, q);
      closeQuickView();
    };

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  // 6. Search Modal Logic
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('navSearchInput');
  const searchResults = document.getElementById('searchResults');
  const searchOpenBtns = document.querySelectorAll('.open-search-btn');
  const searchCloseBtn = document.getElementById('searchCloseBtn');

  function openSearch() {
    if (searchModal && searchInput) {
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput.focus(), 100);
      performSearch('');
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function performSearch(query) {
    if (!searchResults || typeof DASHVIN_PRODUCTS === 'undefined') return;
    const q = query.toLowerCase().trim();
    const matches = DASHVIN_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p style="padding:1.5rem; text-align:center; color:var(--color-muted);">No fresh farm products match "${query}". Try searching for 'milk', 'ghee', or 'curd'.</p>`;
    } else {
      searchResults.innerHTML = matches.map(p => `
        <div style="display:flex; align-items:center; gap:1rem; padding:0.875rem; border-bottom:1px solid var(--color-border); cursor:pointer;" onclick="window.quickViewItem('${p.id}')">
          <img src="${p.image}" alt="${p.name}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
          <div style="flex-grow:1;">
            <strong style="color:var(--color-primary-dark); font-size:0.9375rem; display:block;">${p.name}</strong>
            <span style="font-size:0.75rem; color:var(--color-muted);">${p.unit}</span>
          </div>
          <span style="font-family:var(--font-serif); font-weight:700; color:var(--color-primary);">₹${p.price}</span>
        </div>
      `).join('');
    }
  }

  window.quickViewItem = function(id) {
    closeSearch();
    openQuickViewModal(id);
  };

  searchOpenBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));
  }

  // 7. Checkout Experience (Pure Frontend Demo)
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutDelivery = document.getElementById('checkoutDelivery');
  const checkoutTotal = document.getElementById('checkoutTotal');

  window.openCheckoutModal = function() {
    if (!checkoutModal || typeof DashvinCart === 'undefined') return;
    const cart = DashvinCart.getCart();
    if (cart.length === 0) {
      DashvinCart.showToast('Your farm basket is empty. Please add items to checkout!');
      return;
    }

    // Populate summary
    let itemsHtml = '';
    let subtotal = 0;
    cart.forEach(item => {
      const prod = DASHVIN_PRODUCTS.find(p => p.id === item.id);
      if (!prod) return;
      const total = prod.price * item.qty;
      subtotal += total;
      itemsHtml += `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.875rem;">
          <div>
            <strong style="color:var(--color-primary-dark);">${prod.name}</strong>
            <div style="font-size:0.75rem; color:var(--color-muted);">Qty: ${item.qty} × ₹${prod.price}</div>
          </div>
          <span style="font-weight:700; color:var(--color-primary-dark);">₹${total}</span>
        </div>
      `;
    });

    if (checkoutSummaryItems) checkoutSummaryItems.innerHTML = itemsHtml;
    const delivery = subtotal >= 350 ? 0 : 40;
    if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal}`;
    if (checkoutDelivery) checkoutDelivery.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
    if (checkoutTotal) checkoutTotal.textContent = `₹${subtotal + delivery}`;

    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeCheckout() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });
  }

  // Handle Checkout Form Submit
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderId = `DSV-${Math.floor(100000 + Math.random() * 900000)}`;
      const name = document.getElementById('orderName')?.value.trim() || 'Valued Customer';
      const phone = document.getElementById('orderPhone')?.value.trim() || '';
      const email = document.getElementById('orderEmail')?.value.trim() || '';
      const address = document.getElementById('orderAddress')?.value.trim() || '';
      const city = document.getElementById('orderCity')?.value.trim() || '';
      const pincode = document.getElementById('orderPincode')?.value.trim() || '';
      const slot = document.getElementById('orderSlot')?.value.trim() || 'Morning 5:30 AM - 7:00 AM';

      const cart = (typeof DashvinCart !== 'undefined') ? DashvinCart.getCart() : [];
      let subtotal = 0;
      const itemsList = [];
      cart.forEach((item, index) => {
        const prod = (typeof DASHVIN_PRODUCTS !== 'undefined') ? DASHVIN_PRODUCTS.find(p => p.id === item.id) : null;
        if (prod) {
          const itemTotal = prod.price * item.qty;
          subtotal += itemTotal;
          itemsList.push(`${index + 1}. ${prod.name} (Qty: ${item.qty} × ₹${prod.price} = ₹${itemTotal})`);
        }
      });

      const deliveryFee = subtotal >= 350 ? 0 : 40;
      const totalAmount = subtotal + deliveryFee;

      const targetPhone = '918099112111';
      const messageLines = [
        `*NEW ORDER - DASHVIN FARMS*`,
        `Order ID: #${orderId}`,
        ``,
        `*Customer Details:*`,
        `• Name: ${name}`,
        `• Phone: ${phone}`,
        `• Email: ${email}`,
        `• Delivery Address: ${address}`,
        `• City/Location: ${city}`,
        `• Pincode: ${pincode}`,
        `• Delivery Slot: ${slot}`,
        ``,
        `*Order Items:*`,
        itemsList.length > 0 ? itemsList.join('\n') : '• Custom Farm Dairy Selection',
        ``,
        `*Items Subtotal:* ₹${subtotal}`,
        `*Morning Cold-Chain Delivery:* ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}`,
        `*Total Payable:* ₹${totalAmount}`
      ];
      const whatsappText = messageLines.join('\n');
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(whatsappText)}`;

      // Replace checkout content with celebratory confirmation state
      const checkoutContent = checkoutModal.querySelector('.checkout-modal-content');
      if (checkoutContent) {
        checkoutContent.innerHTML = `
          <div style="text-align:center; padding:2rem 1rem;">
            <div style="width:72px; height:72px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem;">
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="eyebrow" style="justify-content:center; color:#16A34A;">ORDER RESERVED</div>
            <h2 class="heading-lg" style="margin-bottom:0.75rem;">NAVIGATING TO WHATSAPP</h2>
            <p class="lead-text" style="margin:0 auto 1.5rem; font-size:1.0625rem;">
              Namaste <strong>${name}</strong>, your order <strong>#${orderId}</strong> is reserved! Your details are being forwarded to <strong>+91 80991 12111</strong> on WhatsApp.
            </p>

            <div style="max-width:440px; margin:0 auto 1.75rem; background:var(--color-sage-light); padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--color-border); text-align:left;">
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
                <span style="color:var(--color-muted);">Order Number:</span>
                <strong style="color:var(--color-primary-dark); font-family:monospace;">#${orderId}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
                <span style="color:var(--color-muted);">Customer Phone:</span>
                <strong>${phone}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
                <span style="color:var(--color-muted);">Delivery Slot:</span>
                <strong>${slot}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
                <span style="color:var(--color-muted);">Forwarding to:</span>
                <strong style="color:#16A34A;">+91 80991 12111</strong>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.9375rem; padding-top:0.5rem; border-top:1px dashed var(--color-border); margin-top:0.5rem;">
                <span style="color:var(--color-muted); font-weight:600;">Total Payable:</span>
                <strong style="color:var(--color-primary); font-size:1.125rem;">₹${totalAmount}</strong>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; align-items:center; gap:0.75rem;">
              <a href="${whatsappUrl}" class="btn" style="background:#25D366; color:#ffffff; font-weight:700; padding:0.9rem 1.8rem; border-radius:var(--radius-full); text-decoration:none; display:inline-flex; align-items:center; gap:0.5rem; box-shadow:0 4px 14px rgba(37,211,102,0.35);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.983.538 1.838.82 2.796.82 3.183 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.13-.522-1.836-.759-3.003-2.617-3.095-2.74-.092-.122-.733-.976-.733-1.861 0-.885.466-1.32.632-1.5.166-.18.362-.225.482-.225.12 0 .241.002.346.007.11.005.257-.042.402.308.149.362.511 1.246.556 1.338.045.092.075.2.015.32-.06.12-.09.195-.18.3-.09.105-.19.235-.271.316-.09.09-.184.188-.079.369.105.18.468.772 1.005 1.25.692.617 1.275.808 1.456.898.18.09.286.075.391-.045.106-.12.451-.525.572-.705.12-.18.241-.15.405-.09.165.06 1.05.495 1.23.585.18.09.301.135.346.21.045.076.045.436-.099.841z"/>
                </svg>
                Open WhatsApp Now (+91 80991 12111)
              </a>
              <button class="btn btn-outline-dark" onclick="location.reload()" style="margin-top:0.25rem;">
                Back to Farm Home
              </button>
            </div>
          </div>
        `;
      }

      // Clear the cart
      if (typeof DashvinCart !== 'undefined') {
        DashvinCart.clearCart();
      }

      // Navigate to WhatsApp with the customer & order details
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 400);
    });
  }

  // 8. Simple Contact Us Form (Navigate to WhatsApp: 8099112111)
  const contactUsForm = document.getElementById('contactUsForm');
  if (contactUsForm) {
    contactUsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const targetPhone = '918099112111';
      const text = `*NEW CONTACT MESSAGE - DASHVIN FARMS*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n\n*Message:*\n${message}`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(text)}`;

      if (typeof DashvinCart !== 'undefined' && DashvinCart.showToast) {
        DashvinCart.showToast('Navigating to WhatsApp (+91 80991 12111)...');
      }

      // Automatically navigate to WhatsApp
      window.location.href = whatsappUrl;
    });
  }

  // Keyboard shortcut to close modals (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeSearch();
      closeCheckout();
      if (typeof DashvinCart !== 'undefined') {
        DashvinCart.closeCart();
      }
    }
  });
});
