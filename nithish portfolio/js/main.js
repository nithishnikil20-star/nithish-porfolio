/**
 * ============================================================================
 * CINEMATIC PORTFOLIO JAVASCRIPT - VIDEO EDITOR
 * Author: NITHISHKUMAR B
 * Functionality: Circular Nav Glow, Filters, Video Lightbox, Scroll Reveals
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SELECTORS & CACHE
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const cinemaModal = document.getElementById('cinemaModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.querySelector('.cinema-modal-backdrop');
  const modalVideoFrame = document.getElementById('modalVideoFrame');
  const modalPlaceholder = document.getElementById('modalPlaceholder');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalActionLink = document.getElementById('modalActionLink');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const showreelTrigger = document.getElementById('showreelTrigger');

  // --------------------------------------------------------------------------
  // 2. HEADER SCROLL EFFECT
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // --------------------------------------------------------------------------
  if (mobileToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.setAttribute('aria-hidden', isExpanded);
      mobileDrawer.classList.toggle('open', !isExpanded);
      mobileToggle.classList.toggle('active', !isExpanded);
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile menu on clicking any link
    document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. CIRCULAR NAVIGATION HOVER INDICATOR (APPEARS ONLY ON HOVER)
  // --------------------------------------------------------------------------
  const desktopNav = document.querySelector('.desktop-nav');
  const navIndicator = document.querySelector('.nav-circle-indicator');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const showHoverCircle = (targetLink) => {
    if (!navIndicator || !desktopNav || !targetLink) return;

    const navRect = desktopNav.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();

    // Exact center coordinates of the target link
    const centerX = linkRect.left - navRect.left + linkRect.width / 2;
    const centerY = linkRect.top - navRect.top + linkRect.height / 2;

    // Slightly smaller circle, just enough to comfortably surround the text
    const diameter = Math.round(Math.max(linkRect.width + 14, linkRect.height + 14, 52));

    navIndicator.style.width = `${diameter}px`;
    navIndicator.style.height = `${diameter}px`;
    navIndicator.style.left = `${centerX}px`;
    navIndicator.style.top = `${centerY}px`;
    navIndicator.classList.add('visible');
  };

  const hideHoverCircle = () => {
    if (navIndicator) {
      navIndicator.classList.remove('visible');
    }
  };

  desktopNavLinks.forEach(link => {
    link.addEventListener('mouseenter', () => showHoverCircle(link));
  });

  if (desktopNav) {
    desktopNav.addEventListener('mouseleave', hideHoverCircle);
  }

  // Active section scroll spy for the 3 navigation items
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        let targetHref = '';

        if (id === 'home' || id === 'about') {
          targetHref = '#about';
        } else if (id === 'showreel' || id === 'works') {
          targetHref = '#works';
        } else if (id === 'skills' || id === 'services' || id === 'contact') {
          targetHref = '#skills';
        }

        if (targetHref) {
          desktopNavLinks.forEach(link => {
            if (link.getAttribute('href') === targetHref) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          document.querySelectorAll('.mobile-nav-link').forEach(mlink => {
            if (mlink.getAttribute('href') === targetHref) {
              mlink.classList.add('active');
            } else {
              mlink.classList.remove('active');
            }
          });
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 5. PROJECT CATEGORY FILTERING
  // --------------------------------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. CINEMA VIDEO MODAL / LIGHTBOX
  // --------------------------------------------------------------------------
  const openCinemaModal = (data) => {
    if (!cinemaModal) return;

    // Set meta fields
    if (modalTitle) modalTitle.textContent = data.title || 'CINEMATIC PROJECT';
    if (modalCategory) modalCategory.textContent = data.category || 'FEATURED WORK';
    if (modalDesc) modalDesc.textContent = data.desc || 'Video project showcase and post-production edit.';
    if (modalActionLink) {
      modalActionLink.href = data.videoUrl || '#';
      if (!data.videoUrl || data.videoUrl === '#') {
        modalActionLink.style.display = 'none';
      } else {
        modalActionLink.style.display = 'inline-flex';
      }
    }

    // Handle Video source vs Placeholder
    if (data.videoEmbed && data.videoEmbed.trim() !== '') {
      // If user provided a real embed URL (YouTube/Vimeo or .mp4)
      modalVideoFrame.src = data.videoEmbed;
      modalVideoFrame.style.display = 'block';
      modalPlaceholder.style.display = 'none';
    } else {
      // Display cinematic interactive placeholder
      modalVideoFrame.src = '';
      modalVideoFrame.style.display = 'none';
      modalPlaceholder.style.display = 'flex';
      
      const placeholderTitle = modalPlaceholder.querySelector('.modal-preview-title');
      if (placeholderTitle) {
        placeholderTitle.textContent = data.title;
      }
    }

    cinemaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCinemaModal = () => {
    if (!cinemaModal) return;
    cinemaModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video playback by clearing src
    if (modalVideoFrame) {
      modalVideoFrame.src = '';
    }
  };

  // Showreel featured trigger
  if (showreelTrigger) {
    showreelTrigger.addEventListener('click', () => {
      openCinemaModal({
        title: 'OFFICIAL SHOWREEL 2026',
        category: 'FEATURED SHOWREEL',
        desc: 'A high-impact montage of narrative fiction, commercial campaigns, automotive edits, and sound-driven pacing.',
        videoEmbed: '', // Add YouTube/Vimeo embed URL here e.g. "https://www.youtube.com/embed/YOUR_ID?autoplay=1"
        videoUrl: '#'
      });
    });
  }

  // Project cards triggers
  projectCards.forEach(card => {
    const watchBtn = card.querySelector('.btn-watch');
    const mediaWrap = card.querySelector('.project-media-wrap');

    const projectData = {
      title: card.getAttribute('data-title') || 'Project Title',
      category: card.getAttribute('data-category-label') || 'Selected Work',
      desc: card.getAttribute('data-desc') || '',
      videoEmbed: card.getAttribute('data-video-embed') || '',
      videoUrl: card.getAttribute('data-video-url') || '#'
    };

    if (watchBtn) {
      watchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCinemaModal(projectData);
      });
    }

    if (mediaWrap) {
      mediaWrap.addEventListener('click', () => {
        openCinemaModal(projectData);
      });
    }
  });

  // Close modal listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCinemaModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCinemaModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cinemaModal && cinemaModal.classList.contains('active')) {
      closeCinemaModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM SIMULATION & VALIDATION
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Temporary sending state
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2 A 10 10 0 0 1 22 12"></path>
        </svg>
        TRANSMITTING...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `<strong>MESSAGE TRANSMITTED.</strong> Thank you for reaching out! I will review your project details and respond within 24 hours.`;
          formFeedback.style.display = 'block';
        }

        contactForm.reset();

        setTimeout(() => {
          if (formFeedback) formFeedback.style.display = 'none';
        }, 8000);
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 8. CONSOLE WELCOME & PLACEHOLDER GUIDE
  // --------------------------------------------------------------------------
  console.log(
    '%c🎬 NITHISHKUMAR B | VIDEO EDITOR PORTFOLIO',
    'color: #ff6b00; font-size: 14px; font-weight: bold; background: #070709; padding: 6px 12px; border-radius: 4px; border: 1px solid #ff6b00;'
  );
  console.log(
    '%cAll placeholder items are marked in HTML comments: search "PLACEHOLDER" to swap your own videos, links, and photos.',
    'color: #9da3b4; font-size: 11px;'
  );
});
