/**
 * DASHVIN FARMS — Products Catalog & Filter Logic
 * 16 Authentic Farm Products across 4 Categories:
 * - Fresh Milk (4)
 * - Farm Curd (4)
 * - Desi Ghee (4)
 * - Fresh Paneer (4)
 */

const DASHVIN_PRODUCTS = [
  // ==========================================
  // 1. FRESH MILK (4 Products)
  // ==========================================
  {
    id: 'milk-a2',
    name: 'Fresh Farm A2 Gir Cow Milk',
    category: 'milk',
    price: 85,
    unit: '1 Litre Glass Bottle',
    badge: 'Daily Morning Harvest',
    badgeType: 'primary',
    image: 'assets/images/product-milk.jpg',
    rating: 4.9,
    reviewsCount: 342,
    shortDesc: 'Pure unadulterated whole milk from grass-fed indigenous Gir cows. Bottled raw & pasteurized within 2 hours of milking.',
    fullDesc: 'Our Fresh Farm A2 Milk is the hallmark of Dashvin Farms. Sourced exclusively from purebred Gir cows grazing in Moinabad pastures, this milk features a natural golden cream-line on top. Free from artificial hormones, preservatives, or synthetic antibiotics.',
    nutrition: {
      fat: '4.5% - 4.8%',
      protein: '3.4g per 100ml',
      calcium: '130mg per 100ml',
      storage: 'Keep refrigerated at 4°C. Consume within 48 hours.'
    },
    features: ['100% A2 Beta-Casein', 'Non-Homogenized Cream Top', 'Sterilized Glass Bottle', 'Morning 5 AM Doorstep Delivery']
  },
  {
    id: 'milk-buffalo',
    name: 'Pure Murrah Buffalo Whole Milk',
    category: 'milk',
    price: 95,
    unit: '1 Litre Glass Bottle',
    badge: '7.5% High Butterfat',
    badgeType: 'gold',
    image: 'assets/images/product-buffalo-milk.jpg',
    rating: 4.8,
    reviewsCount: 228,
    shortDesc: 'Ultra-creamy, naturally rich whole buffalo milk with 7.5%+ butterfat. Ideal for rich chai, thick kheer, and homemade sweets.',
    fullDesc: 'Harvested from healthy Murrah buffaloes raised with ethical affection in Moinabad. Thick, naturally sweet, and dense, this milk produces rich froth and an opulent cream layer that transforms your morning tea into a luxurious treat.',
    nutrition: {
      fat: '7.5% - 8.0%',
      protein: '4.2g per 100ml',
      calcium: '190mg per 100ml',
      storage: 'Chilled at 4°C. Boil once on gentle flame.'
    },
    features: ['Naturally Thick & Velvety', 'High Calcium & Phosphorus', 'Zero Milk Powder or Dilution', 'Pure Murrah Herd Origin']
  },
  {
    id: 'milk-toned',
    name: 'Farm Fresh Light Toned Milk',
    category: 'milk',
    price: 75,
    unit: '1 Litre Glass Bottle',
    badge: 'Low Fat 3.0%',
    badgeType: 'primary',
    image: 'assets/images/product-toned-milk.jpg',
    rating: 4.7,
    reviewsCount: 164,
    shortDesc: 'Naturally skimmed light cow milk with 3.0% fat. Clean, digestible, and packed with vital minerals for active wellness.',
    fullDesc: 'For health-conscious families who prefer a lighter consistency without losing essential micronutrients. We gently skim excess butterfat while preserving all natural whey proteins, vitamin B12, and bioavailable calcium.',
    nutrition: {
      fat: '3.0%',
      protein: '3.3g per 100ml',
      calcium: '125mg per 100ml',
      storage: 'Refrigerate immediately. Best consumed fresh.'
    },
    features: ['Light & Easy Digestion', 'Zero Artificial Thickeners', 'Glass Bottle Sanitized', 'Rich Natural Protein']
  },
  {
    id: 'milk-haldi',
    name: 'Organic Golden Haldi Turmeric Milk',
    category: 'milk',
    price: 90,
    unit: '500ml Glass Bottle',
    badge: 'Ayurvedic Immunity',
    badgeType: 'gold',
    image: 'assets/images/product-haldi-milk.jpg',
    rating: 4.9,
    reviewsCount: 198,
    shortDesc: 'Slow-simmered A2 milk infused with organic high-curcumin Lakadong turmeric, crushed black pepper, green cardamom, and saffron.',
    fullDesc: 'An ancestral wellness elixir crafted in small batches. Whole A2 cow milk is simmered with organic heirloom turmeric roots, wild forest honey, freshly cracked black pepper (which boosts curcumin absorption by 2000%), and Kashmiri saffron strands.',
    nutrition: {
      fat: '4.6%',
      protein: '3.5g per 100ml',
      curcumin: 'High potency 7% curcumin active',
      storage: 'Shake gently before drinking. Delicious warm or chilled.'
    },
    features: ['Potent Lakadong Turmeric', 'Natural Anti-Inflammatory', 'Infused with Real Saffron', 'Zero Refined Sugars']
  },

  // ==========================================
  // 2. FARM CURD (4 Products)
  // ==========================================
  {
    id: 'curd-matka',
    name: 'Farm Fresh Set Curd (Dahi)',
    category: 'curd',
    price: 65,
    unit: '500g Terracotta Matka',
    badge: 'Clay Pot Set',
    badgeType: 'gold',
    image: 'assets/images/product-curd.jpg',
    rating: 4.8,
    reviewsCount: 218,
    shortDesc: 'Naturally cultured thick curd set in traditional porous earthenware. Rich malai layer with authentic sweet-tangy taste.',
    fullDesc: 'Crafted using heritage heirloom active cultures and whole milk, our Dahi is set inside breathable terracotta pots that absorb excess moisture to produce an unmatched silky, dense texture. Absolutely free from starch, gelatin, or industrial thickeners.',
    nutrition: {
      fat: '4.2%',
      protein: '4.1g per 100g',
      calcium: '145mg per 100g',
      storage: 'Keep chilled. Use within 4 days for optimal probiotic activity.'
    },
    features: ['Living Heritage Probiotics', 'Naturally Thick & Creamy', 'Zero Gelatin or Starch', 'Authentic Earthen Pot Aroma']
  },
  {
    id: 'curd-malai',
    name: 'Creamy Buffalo Milk Malai Dahi',
    category: 'curd',
    price: 75,
    unit: '500g Glass Jar',
    badge: 'Extra Thick Malai',
    badgeType: 'primary',
    image: 'assets/images/product-malai-dahi.jpg',
    rating: 4.9,
    reviewsCount: 284,
    shortDesc: 'Dense, velvety curd made from rich Murrah buffalo milk with a thick golden-white clotted cream top. Mild and zero sourness.',
    fullDesc: 'Slow-set with natural lactic cultures in small batches, this curd is so thick you can cut it with a spoon. Packed with natural dairy fats and beneficial gut-friendly flora, it makes the most divine raitas and dahi bowls.',
    nutrition: {
      fat: '7.0%',
      protein: '4.6g per 100g',
      calcium: '175mg per 100g',
      storage: 'Keep cold below 5°C. Consume within 5 days.'
    },
    features: ['Decadent Spoon-Thick Malai', 'Low Acidity / Sweet Finish', 'Heirloom Bacterial Strains', 'Natural Gut Harmony']
  },
  {
    id: 'curd-chaas',
    name: 'Probiotic Farm Spiced Chaas (Buttermilk)',
    category: 'curd',
    price: 60,
    unit: '1 Litre Glass Bottle',
    badge: 'Slow Churned',
    badgeType: 'primary',
    image: 'assets/images/product-chaas.jpg',
    rating: 4.8,
    reviewsCount: 153,
    shortDesc: 'Authentic hand-churned buttermilk seasoned with hand-roasted cumin seeds, fresh garden mint, ginger, and pink rock salt.',
    fullDesc: 'Obtained directly from our traditional wooden bilona butter churn. Low in fat, ultra-refreshing, and seasoned with natural digestive spices, it restores electrolyte balance and cools the stomach naturally under the Indian sun.',
    nutrition: {
      calories: '28 kcal per 100ml',
      fat: '1.2%',
      electrolytes: 'Rich in potassium, sodium & calcium',
      storage: 'Shake well. Serve chilled with lunch.'
    },
    features: ['Zero Watered-Down Thinness', 'Roasted Bhuna Jeera Flavor', 'Instant Digestive Soother', 'Real Farm Churned Whey']
  },
  {
    id: 'curd-shrikhand',
    name: 'Traditional Kesar Elaichi Shrikhand',
    category: 'curd',
    price: 140,
    unit: '250g Terracotta Bowl',
    badge: 'Artisanal Dessert',
    badgeType: 'gold',
    image: 'assets/images/product-shrikhand.jpg',
    rating: 5.0,
    reviewsCount: 187,
    shortDesc: 'Artisanal hung chakka curd hand-whipped with aromatic green cardamom, raw khand sugar, and pure saffron filaments.',
    fullDesc: 'Our Shrikhand follows time-honored artisanal methods: whole curd is hung in fine muslin cloth for 18 hours until all whey drips away. The dense chakka is gently blended with crushed green cardamom, pistachios, and saffron infused in warm A2 milk.',
    nutrition: {
      fat: '9.5%',
      protein: '6.2g per 100g',
      carbs: '22g (natural unrefined khand)',
      storage: 'Keep refrigerated. Ready to eat dessert.'
    },
    features: ['Authentic Hung Curd Chakka', 'Kashmiri Kesar Infusion', 'Pistachio & Almond Crunch', 'No Artificial Flavorings']
  },

  // ==========================================
  // 3. DESI GHEE (4 Products)
  // ==========================================
  {
    id: 'ghee-bilona',
    name: 'Pure Cow Desi Ghee (Bilona)',
    category: 'ghee',
    price: 850,
    unit: '500ml Glass Jar',
    badge: 'Vedic Bilona Churned',
    badgeType: 'gold',
    image: 'assets/images/product-ghee.jpg',
    rating: 5.0,
    reviewsCount: 489,
    shortDesc: 'Handmade using the ancient two-way wooden bilona churn method from cultured curd, slow-cooked on low flame.',
    fullDesc: 'Dashvin Farms Vedic Ghee is crafted following traditional Ayurveda principles: fresh A2 cow milk is cultured into curd, then hand-churned with a wooden bilona to yield makkhan (white butter), which is slowly simmered in brass vessels until it turns into golden, danedaar (granular) nectar.',
    nutrition: {
      fat: '99.8g per 100g',
      omega3: 'High naturally occurring Omega-3 & CLA',
      vitamins: 'Rich in Vitamin A, D, E & K',
      storage: 'Store in cool dry place. Shelf life: 12 months at room temperature.'
    },
    features: ['Slow Simmered on Brass Pots', 'Rich Granular (Danedaar) Texture', 'Aromatic Nutty Fragrance', 'High Smoke Point (250°C)']
  },
  {
    id: 'ghee-reserve',
    name: 'A2 Gir Cow Bilona Ghee (Heritage Reserve)',
    category: 'ghee',
    price: 1650,
    unit: '1 Litre Glass Jar',
    badge: 'Small-Batch Reserve',
    badgeType: 'gold',
    image: 'assets/images/product-ghee-reserve.jpg',
    rating: 5.0,
    reviewsCount: 312,
    shortDesc: 'Limited harvest reserve crafted solely from free-range Gir cows during auspicious morning hours. Supreme golden amber crystals.',
    fullDesc: 'The crown jewel of Dashvin Farms. Made in strictly limited batches from free-grazing Gir cows nourished on neem, moringa, and fresh pasture clover. Simmered over cow-dung firewood for over 6 hours to develop its signature hazelnut aroma and rich golden grain.',
    nutrition: {
      fat: '99.9g per 100g',
      antioxidants: 'Rich in natural beta-carotene',
      purity: 'Lab certified 100% A2 pure butterfat',
      storage: 'Do not refrigerate. Use dry wooden or brass spoon.'
    },
    features: ['Cow-Dung Firewood Simmered', 'Vedic Ahimsa Milking', 'Supreme Amber Danedaar', 'Certified 0% Palm Oil / Adulterants']
  },
  {
    id: 'ghee-buffalo',
    name: 'Pure Murrah Buffalo Desi Ghee',
    category: 'ghee',
    price: 680,
    unit: '500ml Glass Jar',
    badge: 'High Smoke Point',
    badgeType: 'primary',
    image: 'assets/images/product-buffalo-ghee.jpg',
    rating: 4.8,
    reviewsCount: 194,
    shortDesc: 'Traditional ivory-white granular buffalo ghee with intense aroma and high smoking threshold. Ideal for roasting and frying.',
    fullDesc: 'Crafted from cultured Murrah buffalo cream, this ghee offers a clean, snow-white crystalline texture with a deeply satisfying roasted dairy aroma. Perfect for making crunchy parathas, aromatic biryanis, and traditional Indian sweets like laddus.',
    nutrition: {
      fat: '99.7g per 100g',
      smokePoint: '255°C (ideal for high-heat cooking)',
      vitamins: 'Natural Vitamin A and Essential Fatty Acids',
      storage: 'Room temperature storage in dark pantry.'
    },
    features: ['High Temperature Stability', 'Pure White Danedaar Crystals', 'Authentic Village Aroma', 'Zero Trans Fats']
  },
  {
    id: 'ghee-herbal',
    name: 'Ashwagandha & Brahmi Medicated Ghee',
    category: 'ghee',
    price: 790,
    unit: '350ml Glass Jar',
    badge: 'Ayurvedic Rasayana',
    badgeType: 'gold',
    image: 'assets/images/product-herbal-ghee.jpg',
    rating: 4.9,
    reviewsCount: 142,
    shortDesc: 'A2 bilona ghee processed with potent roots of organic Ashwagandha and wild Brahmi for cognitive sharpness and vitality.',
    fullDesc: 'Formulated in accordance with Charaka Samhita guidelines. Pure A2 Gir cow ghee acts as a bio-enhancer (Yogavahi), delivering the rejuvenating properties of adaptogenic Ashwagandha and memory-boosting Brahmi directly into cell tissues.',
    nutrition: {
      bioactive: 'Standardized with Ashwagandha withanolides',
      fat: '98.5%',
      dosage: 'Take 1 tsp empty stomach with warm water or milk',
      storage: 'Keep sealed in cool dark space.'
    },
    features: ['Cognitive & Memory Support', 'Stress & Cortisol Balance', 'Ayurvedic Ghruta Recipe', 'Organic Certified Herbs']
  },

  // ==========================================
  // 4. FRESH PANEER (4 Products)
  // ==========================================
  {
    id: 'paneer-malai',
    name: 'Fresh Malai Paneer (Cow Milk)',
    category: 'paneer',
    price: 120,
    unit: '250g Vacuum Fresh Pack',
    badge: 'Melt-in-Mouth',
    badgeType: 'primary',
    image: 'assets/images/product-paneer.jpg',
    rating: 4.9,
    reviewsCount: 195,
    shortDesc: 'Artisanal cottage cheese curdled naturally with lemon and whey. Super soft, moist, and rich in natural dairy protein.',
    fullDesc: 'Our Malai Paneer is pressed freshly every morning without artificial coagulants or starch fillers. It absorbs curries beautifully while retaining its delicate, velvety texture that effortlessly melts in your mouth.',
    nutrition: {
      protein: '18.5g per 100g',
      fat: '22g per 100g',
      calcium: '210mg per 100g',
      storage: 'Submerge in clean cold water in the fridge. Best within 4 days.'
    },
    features: ['High Dairy Protein', 'No Added Starch or Rubber', 'Soft Moist Velvety Texture', 'Freshly Hand-Pressed']
  },
  {
    id: 'paneer-buffalo',
    name: 'Rich Buffalo Milk Malai Paneer',
    category: 'paneer',
    price: 220,
    unit: '500g Vacuum Fresh Pack',
    badge: 'Firm & Creamy',
    badgeType: 'primary',
    image: 'assets/images/product-buffalo-paneer.jpg',
    rating: 4.9,
    reviewsCount: 231,
    shortDesc: 'Dense, succulent paneer crafted from whole buffalo milk. Holds perfect cube shape on grill or skewers while staying juicy.',
    fullDesc: 'Made for paneer tikka lovers and rich makhani curries. Natural high butterfat in buffalo milk gives this paneer a rich, juicy bite that never turns rubbery or dry even after searing on high flame.',
    nutrition: {
      protein: '20.2g per 100g',
      fat: '26g per 100g',
      calcium: '240mg per 100g',
      storage: 'Refrigerate at 2-4°C. Consume within 5 days.'
    },
    features: ['Perfect for Tandoor & Curries', 'Zero Crumbling', 'Rich Whole Milk Solid', 'Natural Whey Coagulation']
  },
  {
    id: 'paneer-spiced',
    name: 'Smoked Cumin & Herb Spiced Paneer',
    category: 'paneer',
    price: 145,
    unit: '250g Fresh Pack',
    badge: 'Herbal Infusion',
    badgeType: 'gold',
    image: 'assets/images/product-spiced-paneer.jpg',
    rating: 4.8,
    reviewsCount: 118,
    shortDesc: 'Artisanal paneer blended during pressing with dry-roasted cumin seeds, hand-picked green chili flakes, and coriander.',
    fullDesc: 'Crafted for immediate pan-searing or fresh salads. We fold freshly crushed roasted jeera, garden mint, and gentle green chili flakes directly into the warm paneer curds before hydraulic pressing, locking in bursting flavor in every square.',
    nutrition: {
      protein: '18g per 100g',
      fat: '21g per 100g',
      spices: 'Whole roasted Indian cumin & herbs',
      storage: 'Keep chilled. Pan-fry with a drizzle of ghee.'
    },
    features: ['Pre-Seasoned Gourmet Flavor', 'Bursting with Roasted Jeera', 'Great for Quick Starters', 'Zero Artificial Flavoring']
  },
  {
    id: 'paneer-protein',
    name: 'Low-Fat High-Protein Artisanal Paneer',
    category: 'paneer',
    price: 110,
    unit: '250g Fresh Pack',
    badge: 'Fitness Fuel • 24g Protein',
    badgeType: 'primary',
    image: 'assets/images/product-protein-paneer.jpg',
    rating: 4.9,
    reviewsCount: 205,
    shortDesc: 'Crafted from low-fat A2 milk for athletes and fitness enthusiasts. 24g pure bioavailable casein protein per 100g with only 4% fat.',
    fullDesc: 'Engineered for healthy weight management, bodybuilding, and clean nutrition without compromising on softness. Made by curdling skimmed whole cow milk with natural fermented whey, producing a firm, squeaky-clean protein source.',
    nutrition: {
      protein: '24.5g per 100g',
      fat: '4.2g per 100g',
      calories: '138 kcal per 100g',
      storage: 'Keep cold. Perfect for raw salads or scrambled bhurji.'
    },
    features: ['High 24g Bioavailable Protein', 'Ultra-Low 4% Dairy Fat', 'Clean Muscle Fuel', 'No Preservatives or Soya']
  }
];

// Helper: render stars SVGs
function renderRatingStars(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    } else {
      starsHtml += `<svg viewBox="0 0 24 24" style="fill:none; stroke:var(--color-gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
  }
  return starsHtml;
}

// Render product card
function createProductCardHTML(product) {
  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image-wrap">
        <span class="product-badge ${product.badgeType === 'gold' ? 'product-badge--gold' : ''}">${product.badge}</span>
        <div class="product-actions-floating">
          <button class="product-action-icon wishlist-btn" data-id="${product.id}" aria-label="Add to wishlist" title="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" width="400" height="400">
        <button class="product-quickview-btn" data-id="${product.id}">Quick View</button>
      </div>

      <div class="product-info">
        <div class="product-rating">
          ${renderRatingStars(product.rating)}
          <span class="product-rating-count">(${product.reviewsCount})</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.shortDesc}</p>

        <div class="product-meta">
          <div class="product-price-box">
            <span class="product-price">₹${product.price}</span>
            <span class="product-unit">${product.unit}</span>
          </div>

          <div class="qty-control" data-id="${product.id}">
            <button class="qty-btn qty-decrease" aria-label="Decrease quantity">−</button>
            <span class="qty-input">1</span>
            <button class="qty-btn qty-increase" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <button class="add-to-cart-btn" data-id="${product.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  `;
}
