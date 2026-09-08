/**
 * App.js - Global Interactions, Navigation, Toasts, and Modals
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActiveLinks();
  initModals();
  initLightbox();
});

/* Navigation & Mobile Drawer */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.nav-mobile-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!menuToggle || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close when clicking outside content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* Active Link Highlighting */
function initActiveLinks() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Toast Notification Utility */
window.showToast = function(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
};

/* Modal Dialogs */
function initModals() {
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      window.openModal(targetId);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeModal(modal.id);
      }
    });

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => window.closeModal(modal.id));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.open');
      if (openModal) window.closeModal(openModal.id);
    }
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const focusable = modal.querySelector('button, input, select, textarea, [tabindex="0"]');
  if (focusable) focusable.focus();
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

/* Image Lightbox */
function initLightbox() {
  let lightbox = document.getElementById('image-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.className = 'modal-backdrop';
    lightbox.innerHTML = `
      <div class="modal-dialog lightbox-dialog" role="dialog" aria-modal="true">
        <button type="button" class="modal-close" style="color:#fff; align-self:flex-end;" aria-label="Close image preview">&times;</button>
        <img id="lightbox-img" src="" alt="Enlarged community photo" style="max-width:100%; border-radius:8px;">
      </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('modal-close')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

window.openLightbox = function(src, alt = 'Property Photo') {
  const lightbox = document.getElementById('image-lightbox');
  const img = document.getElementById('lightbox-img');
  if (lightbox && img) {
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};
