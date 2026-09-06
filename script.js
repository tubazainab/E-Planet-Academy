/**
 * ePlanet Speakers Academy - Ismailpura, Kamptee, Maharashtra
 * Pure Vanilla JavaScript: Interactivity, Validation & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // [ACADEMY CONFIGURATION]
  // Official Contact Information for ePlanet Speakers Academy, Kamptee
  // ========================================================================
  const ACADEMY_CONFIG = {
    whatsappNumber: '919960462058',
    phoneNumber: '+919960462058',
    academyName: 'ePlanet Speakers Academy',
    location: 'Ismailpura, Kamptee, Maharashtra'
  };

  // ------------------------------------------------------------------------
  // 1. DYNAMIC YEAR IN FOOTER
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. STICKY HEADER SCROLL SHADOW
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 3. MOBILE HAMBURGER NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    hamburgerBtn?.classList.add('open');
    navMenu?.classList.add('open');
    navOverlay?.classList.add('open');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeMobileMenu() {
    hamburgerBtn?.classList.remove('open');
    navMenu?.classList.remove('open');
    navOverlay?.classList.remove('open');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navOverlay?.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMobileMenu();
      }
    });
  });

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  function highlightCurrentSection() {
    const scrollY = window.pageYOffset;
    const offsetThreshold = 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - offsetThreshold;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        matchingLink?.classList.add('active');
      } else {
        matchingLink?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentSection, { passive: true });

  // ------------------------------------------------------------------------
  // 5. FAQ ACCORDION INTERACTIVITY
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn?.addEventListener('click', () => {
      const isCurrentActive = item.classList.contains('active');

      // Close all other FAQ items for a clean accordion experience
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isCurrentActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. ENQUIRY FORM VALIDATION & WHATSAPP REDIRECTION
  // ------------------------------------------------------------------------
  const enquiryForm = document.getElementById('enquiryForm');
  const fullNameInput = document.getElementById('fullName');
  const mobileInput = document.getElementById('mobileNumber');
  const courseSelect = document.getElementById('courseSelect');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const courseError = document.getElementById('courseError');

  function validateInput(input, errorElement, validationFn) {
    const isValid = validationFn(input.value.trim());
    if (!isValid) {
      input.classList.add('is-invalid');
      errorElement?.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      errorElement?.classList.remove('visible');
      return true;
    }
  }

  // Real-time input cleanup & error dismissal
  fullNameInput?.addEventListener('input', () => {
    if (fullNameInput.value.trim().length >= 2) {
      fullNameInput.classList.remove('is-invalid');
      nameError?.classList.remove('visible');
    }
  });

  mobileInput?.addEventListener('input', () => {
    // Only allow numeric characters
    mobileInput.value = mobileInput.value.replace(/\D/g, '');
    if (/^[0-9]{10}$/.test(mobileInput.value.trim())) {
      mobileInput.classList.remove('is-invalid');
      phoneError?.classList.remove('visible');
    }
  });

  courseSelect?.addEventListener('change', () => {
    if (courseSelect.value !== '') {
      courseSelect.classList.remove('is-invalid');
      courseError?.classList.remove('visible');
    }
  });

  enquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate fields
    const isNameValid = validateInput(
      fullNameInput,
      nameError,
      val => val.length >= 2
    );

    const isPhoneValid = validateInput(
      mobileInput,
      phoneError,
      val => /^[0-9]{10}$/.test(val)
    );

    const isCourseValid = validateInput(
      courseSelect,
      courseError,
      val => val !== ''
    );

    if (!isNameValid || !isPhoneValid || !isCourseValid) {
      if (!isNameValid) fullNameInput?.focus();
      else if (!isPhoneValid) mobileInput?.focus();
      else if (!isCourseValid) courseSelect?.focus();
      return;
    }

    const name = fullNameInput.value.trim();
    const phone = mobileInput.value.trim();
    const course = courseSelect.value;
    const userMsg = messageInput?.value.trim() || 'Please share details regarding batch timings and admission.';

    // Construct formatted WhatsApp message
    const formattedMessage = 
      `*Admission Enquiry - ePlanet Speakers Academy*\n` +
      `----------------------------------------\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Mobile:* ${phone}\n` +
      `📚 *Program:* ${course}\n` +
      `💬 *Message:* ${userMsg}\n` +
      `📍 *Location:* Ismailpura, Kamptee\n` +
      `----------------------------------------\n` +
      `Hello, I would like to enquire about your English speaking classes and batch timings.`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${ACADEMY_CONFIG.whatsappNumber}?text=${encodedText}`;

    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  // ------------------------------------------------------------------------
  // 7. BACK TO TOP BUTTON
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ------------------------------------------------------------------------
  // 8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.main-service-card, .feature-card, .step-card, .gallery-card, .about-card-main, .about-focus-areas, .message-banner-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // 9. GALLERY LIGHTBOX MODAL
  // ------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const galleryModalCaption = document.getElementById('galleryModalCaption');
  const galleryModalClose = document.getElementById('galleryModalClose');
  const galleryModalOverlay = document.getElementById('galleryModalOverlay');

  function openGalleryModal(fullSrc, title, caption, altText) {
    if (!galleryModal || !galleryModalImg) return;
    galleryModalImg.src = fullSrc;
    galleryModalImg.alt = altText || title || 'Gallery Image';
    if (galleryModalTitle) galleryModalTitle.textContent = title || '';
    if (galleryModalCaption) galleryModalCaption.textContent = caption || '';
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const title = card.getAttribute('data-title');
      const caption = card.getAttribute('data-caption');
      const img = card.querySelector('.gallery-img');
      const altText = img ? img.getAttribute('alt') : title;
      if (fullSrc) {
        openGalleryModal(fullSrc, title, caption, altText);
      }
    });
  });

  galleryModalClose?.addEventListener('click', closeGalleryModal);
  galleryModalOverlay?.addEventListener('click', closeGalleryModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal?.classList.contains('active')) {
      closeGalleryModal();
    }
  });

});
