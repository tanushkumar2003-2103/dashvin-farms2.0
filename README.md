# Dashvin Farms — Client Demo Website

> **Authentic Indian Dairy Farm + Premium Modern E-Commerce**
> 
> *Pure Dairy, Rooted in Tradition • 10+ Years of Stewardship*

---

## 🌾 Concept & Design Philosophy

Dashvin Farms is an authentic Indian dairy farm with 10+ years of heritage, providing pure unadulterated dairy products:
- **Fresh Farm A2 Milk** (Indigenous Gir cows)
- **Farm Fresh Set Curd (Dahi)** (Traditional terracotta earthen pot)
- **Pure Desi Cow Ghee** (Ancient Vedic Bilona two-way wooden churn)
- **Fresh Malai Paneer** (Soft, melt-in-mouth, high protein)

### Balance:
- **70% Premium Modern E-Commerce**: Refined typography, glassmorphism transitions, intuitive cart drawer, product quick view modals, tactile interactions, and smooth animations.
- **30% Authentic Indian Rural Character**: High-definition documentary photography of Gir cows, Murrah buffaloes, morning mist, clean cowsheds, and traditional clay vessels.

---

## 🎨 Color Palette
- **Deep Forest Green**: `#1E3022`
- **Farm Green**: `#3F5B3A`
- **Milk Cream**: `#F8F5ED`
- **Pure Cream White**: `#FCFAF6`
- **Warm Beige**: `#D8C39A`
- **Earth Brown**: `#6B4F35`
- **Muted Gold**: `#B28A45`
- **Charcoal Text**: `#20231F`

---

## 📽️ Hero Section
- Features the **cinematic Google Flow AI farm video** (`assets/videos/dashvin-farms-hero.mp4`) as a full-viewport centerpiece.
- Autoplays, loops, muted by default with an interactive sound toggle button.
- Subtle natural gradient overlays for high contrast and readability.
- Clear typography hierarchy with custom call-to-actions.

---

## 🛠️ Architecture & Tech Stack

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3 / Vanilla CSS**: Custom properties (CSS variables), modern Flexbox & Grid layouts, responsive typography with `clamp()`.
- **Vanilla JavaScript**: Modular architecture (`products.js`, `cart.js`, `animations.js`, `main.js`).
- **Persistence**: `localStorage` shopping cart with real-time badges, item counter, delivery fee calculator, and promo code support (`DASHVIN10`).
- **Zero Heavy Frameworks**: No React, Vue, Angular, Tailwind, or complex databases.

---

## 📁 File Structure

```
dashvin-farms/
├── index.html            # Main home experience: Hero video, Farm intro, 4 Pillars, 5-Step Journey, Products, Why Us, Reviews, CTA
├── shop.html             # Dedicated shop catalog with category filters, sorting, and subscriptions
├── story.html            # Deep-dive farm heritage, Gir/Murrah cattle breeds, Bilona process, and photo gallery
├── contact.html          # Weekend farm tour booking demo, location card, and FAQ accordion
├── css/
│   ├── style.css         # Design tokens, typography, component styling, animations
│   └── responsive.css    # Responsive breakpoints (320px, 375px, 480px, 768px, 1024px, 1440px)
├── js/
│   ├── products.js       # Product catalog data, badges, nutritional facts, rendering logic
│   ├── cart.js           # Cart state in localStorage, drawer toggle, qty updates, promo code
│   ├── animations.js     # Video sound toggle, 5-step journey switcher, animated counters
│   └── main.js           # Navbar scroll glass transition, modals, search filter, demo checkout
├── assets/
│   ├── images/           # High-resolution authentic Indian farm & product photography
│   └── videos/
│       └── dashvin-farms-hero.mp4 # Cinematic AI farm video
└── README.md
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser, or run a lightweight local static server:

```powershell
# Using Python
python -m http.server 8080

# Or using Node.js npx serve
npx -y serve -p 8080
```
Then visit `http://localhost:8080` in your web browser.
