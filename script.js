/**
 * ============================================================================
 * VISHNU VELLUVA — PERSONAL PORTFOLIO JAVASCRIPT
 * File: script.js
 *
 * Plain vanilla JavaScript. No external libraries, no frameworks.
 * Thoroughly commented for complete beginner clarity and understanding.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Check if visitor has enabled 'Reduce Motion' in their operating system
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. FLOATING PILL NAV: SHRINK & DEEPEN SHADOW PAST 50PX SCROLL
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function updateNavOnScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavOnScroll, { passive: true });
  updateNavOnScroll(); // Run immediately on page load

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER & HAMBURGER
     Toggles drawer open/close and automatically closes when any link is tapped.
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link, .mobile-drawer-btn');

  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    mobileDrawer.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !mobileDrawer) return;
    hamburgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = hamburgerBtn.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when tapping any link inside the mobile drawer
    mobileDrawerLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close drawer when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && !mobileDrawer.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. SMOOTH SCROLLING WITH FLOATING NAV OFFSET
     Accounts for the 24px floating nav position to prevent section clipping.
     -------------------------------------------------------------------------- */
  const internalNavLinks = document.querySelectorAll('a[href^="#"]');

  internalNavLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 60;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight + 36);

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. SECTION & CARD FADE-UP ANIMATIONS (60ms Stagger)
     Sections and internal cards fade up 20px as they enter the viewport.
     -------------------------------------------------------------------------- */
  const sectionContainers = document.querySelectorAll('.section-rhythm');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Collect all cards, cells, and items for smooth staggered reveal
    sectionContainers.forEach(function (section) {
      const revealItems = section.querySelectorAll(
        '.hero-left, .hero-right, .stat-cell, .bento-card, .work-card, .process-step, .linkedin-post-card, .contact-dark-card'
      );

      revealItems.forEach(function (item) {
        item.classList.add('fade-up-item');
      });

      const sectionObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const items = entry.target.querySelectorAll('.fade-up-item');
              items.forEach(function (item, index) {
                // Apply 60ms stagger per child card
                setTimeout(function () {
                  item.classList.add('is-revealed');
                }, index * 60);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      sectionObserver.observe(section);
    });
  } else {
    // If reduced motion is preferred or IntersectionObserver not supported, reveal all immediately
    document.querySelectorAll('.fade-up-item').forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* --------------------------------------------------------------------------
     5. STAT NUMBERS COUNT-UP ANIMATION
     Counts up numbers once when the stat strip scrolls into view.
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statSection = document.getElementById('stats');
  let hasStatsAnimated = false;

  function runCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1600; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    // Smooth ease-out cubic curve: 1 - (1 - progress)^3
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    const counter = setInterval(function () {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const currentVal = Math.round(target * progress);

      element.textContent = prefix + currentVal + suffix;

      if (frame >= totalFrames) {
        clearInterval(counter);
        element.textContent = prefix + target + suffix;
      }
    }, frameRate);
  }

  if (statSection && statNumbers.length > 0) {
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !hasStatsAnimated) {
              hasStatsAnimated = true;
              statNumbers.forEach(function (numEl) {
                runCountUp(numEl);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statSection);
    } else {
      // Direct assignment if animations are disabled
      statNumbers.forEach(function (numEl) {
        const target = numEl.getAttribute('data-target');
        const prefix = numEl.getAttribute('data-prefix') || '';
        const suffix = numEl.getAttribute('data-suffix') || '';
        numEl.textContent = prefix + target + suffix;
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. MOBILE STICKY BOTTOM ACTION BAR (Below 768px only)
     Appears after the visitor scrolls past the hero section.
     Automatically hides when the Contact section or Footer enters view
     so it never covers the contact buttons or footer details.
     -------------------------------------------------------------------------- */
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('hero');
  const contactSection = document.getElementById('contact');
  const footerSection = document.getElementById('site-footer');

  let isHeroVisible = true;
  let isContactOrFooterInView = false;

  function updateMobileStickyVisibility() {
    if (window.innerWidth >= 768 || !mobileStickyBar) {
      if (mobileStickyBar) mobileStickyBar.classList.remove('is-visible');
      return;
    }

    if (!isHeroVisible && !isContactOrFooterInView) {
      mobileStickyBar.classList.add('is-visible');
    } else {
      mobileStickyBar.classList.remove('is-visible');
    }
  }

  if (mobileStickyBar && heroSection && contactSection && footerSection) {
    if ('IntersectionObserver' in window) {
      // Observe Hero section
      const heroObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            isHeroVisible = entry.isIntersecting;
            updateMobileStickyVisibility();
          });
        },
        { threshold: 0.1 }
      );
      heroObserver.observe(heroSection);

      // Observe Contact Section & Footer
      const hideObserver = new IntersectionObserver(
        function () {
          const contactRect = contactSection.getBoundingClientRect();
          const footerRect = footerSection.getBoundingClientRect();
          const vh = window.innerHeight;

          const contactVisible = contactRect.top < vh && contactRect.bottom > 0;
          const footerVisible = footerRect.top < vh && footerRect.bottom > 0;

          isContactOrFooterInView = contactVisible || footerVisible;
          updateMobileStickyVisibility();
        },
        { threshold: 0.05 }
      );

      hideObserver.observe(contactSection);
      hideObserver.observe(footerSection);
    }

    window.addEventListener('resize', updateMobileStickyVisibility);
    window.addEventListener('scroll', function () {
      if (window.innerWidth < 768) {
        const heroRect = heroSection.getBoundingClientRect();
        const contactRect = contactSection.getBoundingClientRect();
        const footerRect = footerSection.getBoundingClientRect();
        const vh = window.innerHeight;

        isHeroVisible = heroRect.bottom > 120;
        isContactOrFooterInView = contactRect.top < vh || footerRect.top < vh;

        updateMobileStickyVisibility();
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & CLIENT-SIDE CONSOLE LOGGING
     - Validates required inputs with inline error helpers below fields
     - Honeypot anti-spam check for bots
     - Displays "Sending..." state, logs payload to console, and shows success card
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const formStatus = document.getElementById('form-status');

  const inputName = document.getElementById('form-name');
  const inputEmail = document.getElementById('form-email');
  const inputPhone = document.getElementById('form-phone');
  const inputService = document.getElementById('form-service');
  const inputMessage = document.getElementById('form-message');
  const inputHoneypot = document.getElementById('form-website');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorPhone = document.getElementById('error-phone');
  const errorService = document.getElementById('error-service');
  const errorMessage = document.getElementById('error-message');

  function setInlineError(input, errorEl, message) {
    if (input) input.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = message;
  }

  function clearInlineError(input, errorEl) {
    if (input) input.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmailAddress(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  // Clear errors as soon as user types
  if (inputName) {
    inputName.addEventListener('input', function () {
      if (inputName.value.trim() !== '') clearInlineError(inputName, errorName);
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', function () {
      if (isValidEmailAddress(inputEmail.value.trim())) clearInlineError(inputEmail, errorEmail);
    });
  }

  if (inputMessage) {
    inputMessage.addEventListener('input', function () {
      if (inputMessage.value.trim().length >= 10) clearInlineError(inputMessage, errorMessage);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Reset previous status
      formStatus.className = 'dark-form-status';
      formStatus.textContent = '';

      let hasErrors = false;

      // 1. Honeypot check (real users never fill this)
      if (inputHoneypot && inputHoneypot.value.trim() !== '') {
        console.warn('Bot submission blocked via honeypot field.');
        return;
      }

      // 2. Validate Name
      const nameVal = inputName.value.trim();
      if (!nameVal) {
        setInlineError(inputName, errorName, 'Please enter your name.');
        hasErrors = true;
      } else {
        clearInlineError(inputName, errorName);
      }

      // 3. Validate Email
      const emailVal = inputEmail.value.trim();
      if (!emailVal) {
        setInlineError(inputEmail, errorEmail, 'Please enter your email address.');
        hasErrors = true;
      } else if (!isValidEmailAddress(emailVal)) {
        setInlineError(inputEmail, errorEmail, 'Please enter a valid email address.');
        hasErrors = true;
      } else {
        clearInlineError(inputEmail, errorEmail);
      }

      // 4. Validate Service selection
      const serviceVal = inputService.value;
      if (!serviceVal) {
        setInlineError(inputService, errorService, 'Please select a service.');
        hasErrors = true;
      } else {
        clearInlineError(inputService, errorService);
      }

      // 5. Validate Message
      const messageVal = inputMessage.value.trim();
      if (!messageVal) {
        setInlineError(inputMessage, errorMessage, 'Please enter your message.');
        hasErrors = true;
      } else if (messageVal.length < 10) {
        setInlineError(inputMessage, errorMessage, 'Please provide a little more detail (at least 10 characters).');
        hasErrors = true;
      } else {
        clearInlineError(inputMessage, errorMessage);
      }

      if (hasErrors) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 6. Valid Submission State
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';

      const payload = {
        name: nameVal,
        email: emailVal,
        phone: inputPhone.value.trim() || 'Not provided',
        service: serviceVal,
        message: messageVal,
        submittedAt: new Date().toISOString()
      };

      console.log('Enquiry Form Submission Received:', payload);

      // Short delay for smooth visual feedback
      setTimeout(function () {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send enquiry';

        formStatus.classList.add('status-success');
        formStatus.textContent = 'Thank you! Your enquiry has been received. I will reply to you today.';

        contactForm.reset();
      }, 400);
    });
  }
});
