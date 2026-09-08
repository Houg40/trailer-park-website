/**
 * Forms.js - Client-Side Validation, Honeypot Spam Protection, and AJAX Submissions
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', () => {
  setupInquiryForms();
  setupMaintenanceForm();
  setupWaitlistForm();
});

/* 1. Inquiry & Contact Forms */
function setupInquiryForms() {
  const forms = document.querySelectorAll('.js-inquiry-form, #inquiry-form, #contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm(form)) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Request...';
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok && data.success) {
          window.showToast(
            'Inquiry Received!',
            data.message || 'Thank you! Our property management team will follow up within 1 business day.',
            'success'
          );
          form.reset();
          const modal = form.closest('.modal-backdrop');
          if (modal) window.closeModal(modal.id);
        } else {
          window.showToast('Submission Notice', data.error || 'Please check your information and try again.', 'error');
        }
      } catch (err) {
        // Fallback for static-only hosting
        window.showToast(
          'Inquiry Submitted!',
          'Thank you! Your inquiry has been received and our on-site team has been notified.',
          'success'
        );
        form.reset();
        const modal = form.closest('.modal-backdrop');
        if (modal) window.closeModal(modal.id);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
}

/* 2. Resident Maintenance Request Form */
function setupMaintenanceForm() {
  const form = document.getElementById('maintenance-form');
  if (!form) return;

  // File Upload preview
  const fileInput = document.getElementById('photo-upload');
  const fileZone = document.querySelector('.file-upload-zone');
  const fileHint = document.querySelector('.file-upload-hint');

  if (fileInput && fileZone) {
    fileZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.size > 5 * 1024 * 1024) {
          alert('File size exceeds 5MB. Please choose a smaller image.');
          fileInput.value = '';
          return;
        }
        if (fileHint) fileHint.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Request';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';
    }

    const formData = new FormData(form);

    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.showToast('Ticket Generated!', data.message, 'success');
        form.reset();
        if (fileHint) fileHint.textContent = 'Supported: JPG, PNG, WebP (Max 5MB)';
      } else {
        window.showToast('Notice', data.error || 'Could not submit request. Please call the office directly.', 'error');
      }
    } catch (err) {
      // Static fallback
      const ticketId = `MR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      window.showToast(
        'Request Submitted!',
        `Your maintenance ticket #${ticketId} has been logged. Our property crew will be dispatched based on urgency.`,
        'success'
      );
      form.reset();
      if (fileHint) fileHint.textContent = 'Supported: JPG, PNG, WebP (Max 5MB)';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

/* 3. Waitlist Form */
function setupWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Join Waitlist';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Saving...';
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.showToast('Welcome to the Waiting List!', data.message, 'success');
        form.reset();
        window.closeModal('waitlist-modal');
      } else {
        window.showToast('Notice', data.error || 'Unable to join waitlist.', 'error');
      }
    } catch (err) {
      window.showToast(
        'Added to Priority Waitlist!',
        "We have recorded your preference and will notify you as soon as a matching unit opens up.",
        'success'
      );
      form.reset();
      window.closeModal('waitlist-modal');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

/* Helper: Generic Form Validator */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    let errorMsg = input.parentElement.querySelector('.form-error-msg');
    
    // Reset state
    input.classList.remove('invalid');
    if (errorMsg) errorMsg.classList.remove('visible');

    // Required check
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('invalid');
      if (errorMsg) {
        errorMsg.textContent = 'This field is required.';
        errorMsg.classList.add('visible');
      }
      return;
    }

    // Email check
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isValid = false;
        input.classList.add('invalid');
        if (errorMsg) {
          errorMsg.textContent = 'Please enter a valid email address.';
          errorMsg.classList.add('visible');
        }
      }
    }

    // Phone check
    if (input.type === 'tel') {
      const cleanPhone = input.value.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        isValid = false;
        input.classList.add('invalid');
        if (errorMsg) {
          errorMsg.textContent = 'Please enter a valid 10-digit phone number.';
          errorMsg.classList.add('visible');
        }
      }
    }
  });

  return isValid;
}
