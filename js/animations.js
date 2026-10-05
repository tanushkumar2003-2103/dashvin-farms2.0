/**
 * DASHVIN FARMS — Smooth Animations & Interactive Journey
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Video Sound Toggle
  const heroVideo = document.getElementById('heroVideo');
  const soundToggleBtn = document.getElementById('heroSoundToggle');

  if (heroVideo && soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      const isMuted = heroVideo.muted;

      soundToggleBtn.innerHTML = isMuted ? `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        <span>Sound Off</span>
      ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <span>Sound On</span>
      `;
    });
  }

  // 2. Interactive Farm-to-Family Journey Stepper
  const journeyButtons = document.querySelectorAll('.journey-step-btn');
  const journeyImages = document.querySelectorAll('.journey-image');
  const journeyBadge = document.querySelector('.journey-image-badge');

  if (journeyButtons.length > 0 && journeyImages.length > 0) {
    journeyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.dataset.step;

        // Toggle buttons
        journeyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle images
        journeyImages.forEach(img => {
          if (img.dataset.step === step) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });

        // Update badge
        if (journeyBadge) {
          const stepNames = {
            '1': '01 — Indigenous Gir & Murrah Sanctuary',
            '2': '02 — Ethical Diet & Daily Herbal Care',
            '3': '03 — Untouched Morning Milking at 4:30 AM',
            '4': '04 — Slow Vedic Bilona & Clay Pot Fermentation',
            '5': '05 — Glass Bottled Delivery to Your Doorstep'
          };
          journeyBadge.textContent = stepNames[step] || 'Dashvin Journey';
        }
      });
    });

    // Auto-advance journey every 5.5s unless hovered
    let autoJourneyTimer;
    let currentJourneyIndex = 0;
    const journeyContainer = document.querySelector('.journey-container');

    function startAutoJourney() {
      autoJourneyTimer = setInterval(() => {
        currentJourneyIndex = (currentJourneyIndex + 1) % journeyButtons.length;
        journeyButtons[currentJourneyIndex].click();
      }, 5500);
    }

    if (journeyContainer) {
      journeyContainer.addEventListener('mouseenter', () => clearInterval(autoJourneyTimer));
      journeyContainer.addEventListener('mouseleave', () => startAutoJourney());
      startAutoJourney();
    }
  }

  // 3. Animated Number Counters
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let count = 0;
          const duration = 1800;
          const stepTime = Math.max(20, Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = count + suffix;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
  }

  // 4. Scroll Reveal Fade-In
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => scrollObserver.observe(el));
  }
});
