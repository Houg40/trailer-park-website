/**
 * Community-Detail.js - Populates the Individual Community Page
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const commId = urlParams.get('id') || 'oak-ridge';

  const communities = await window.EHC.getCommunities();
  const comm = communities.find(c => c.id === commId) || communities[0];

  if (!comm) return;

  // Set Document Title
  document.title = `${comm.name} in ${comm.city}, ${comm.state} | Evergreen Heritage Communities`;

  // Breadcrumbs
  const breadcrumb = document.getElementById('comm-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = comm.name;

  // Hero Section
  setText('comm-name', comm.name);
  setText('comm-location', `${comm.city}, ${comm.state} • ${comm.metro || ''}`);
  setText('comm-tagline', comm.tagline);
  setText('comm-desc', comm.description);
  setText('comm-badge', comm.availabilityStatus);
  setText('comm-phone-text', comm.phone);

  const phoneLink = document.getElementById('comm-phone-link');
  if (phoneLink) phoneLink.href = `tel:${comm.phone.replace(/[^0-9]/g, '')}`;

  const directionsLink = document.getElementById('comm-directions-link');
  if (directionsLink) {
    directionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${comm.lat},${comm.lng}`;
    directionsLink.target = '_blank';
    directionsLink.rel = 'noopener noreferrer';
  }

  // Hero Image
  const heroImg = document.getElementById('comm-hero-img');
  if (heroImg) {
    heroImg.src = comm.image;
    heroImg.alt = `${comm.name} entrance and neighborhood in ${comm.city}, ${comm.state}`;
  }

  // Quick Stats
  setText('stat-lot-rent', comm.pricing.startingLotRent.split('/')[0]);
  setText('stat-lots', `${comm.totalLots} Sites`);
  setText('stat-hours', comm.officeHours);
  setText('stat-type', comm.communityType);
  setText('comm-address-full', `${comm.address}, ${comm.city}, ${comm.state} ${comm.zip}`);

  // Pricing Table
  const pricingBody = document.getElementById('pricing-table-body');
  if (pricingBody) {
    pricingBody.innerHTML = `
      <tr>
        <td class="pricing-highlight">Standard Homesite Lot Rent</td>
        <td><strong>${comm.pricing.startingLotRent}</strong></td>
        <td>Includes weekly curbside trash/recycle & common grounds care</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Homes for Rent</td>
        <td><strong>${comm.pricing.homeRentalStarting}</strong></td>
        <td>Subject to active availability. Includes lot fee.</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Homes for Sale</td>
        <td><strong>Starting at ${comm.pricing.homeSaleStarting}</strong></td>
        <td>New and quality pre-owned homes. Third-party financing assistance available.</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Security Deposit</td>
        <td>${comm.pricing.securityDeposit}</td>
        <td>Refundable per standard Texas lease guidelines</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Application Fee</td>
        <td>${comm.pricing.applicationFee}</td>
        <td>Covers credit, background, and residency verification</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Utilities Included</td>
        <td colspan="2">${comm.pricing.utilitiesIncluded}</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Sub-Metered / Resident Utilities</td>
        <td colspan="2">${comm.pricing.utilitiesSeparate}</td>
      </tr>
      <tr>
        <td class="pricing-highlight">Standard Lease Term</td>
        <td colspan="2">${comm.pricing.leaseTerms}</td>
      </tr>
    `;
  }

  // Amenities Grid
  const amenitiesContainer = document.getElementById('comm-amenities-grid');
  if (amenitiesContainer) {
    amenitiesContainer.innerHTML = comm.amenities.map(a => `
      <div class="feature-card" style="padding: 16px;">
        <div class="feature-icon-wrapper" style="width: 36px; height: 36px; margin-bottom: 8px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 2px;">${a}</h4>
      </div>
    `).join('');
  }

  // Gallery
  const galleryContainer = document.getElementById('comm-gallery-grid');
  if (galleryContainer && comm.gallery) {
    galleryContainer.innerHTML = comm.gallery.map((imgSrc, idx) => `
      <div class="gallery-thumb" onclick="window.openLightbox('${imgSrc}', '${comm.name} Photo ${idx + 1}')">
        <img src="${imgSrc}" alt="${comm.name} Gallery ${idx + 1}" loading="lazy">
        <div class="gallery-zoom-overlay">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
      </div>
    `).join('');
  }

  // Rules Snapshot
  const rules = comm.rulesSnapshot;
  if (rules) {
    setText('rule-pets-text', rules.pets);
    setText('rule-parking-text', rules.parking);
    setText('rule-quiet-text', rules.quietHours);
    setText('rule-maint-text', rules.maintenance);
    setText('rule-rv-text', rules.rvs);
  }

  // Nearby Services
  const nearby = comm.nearbyServices;
  if (nearby) {
    setText('nearby-grocery', nearby.grocery);
    setText('nearby-schools', nearby.schools);
    setText('nearby-healthcare', nearby.healthcare);
    setText('nearby-commute', nearby.commute);
    setText('nearby-rec', nearby.recreation);
  }

  // FAQs Accordion
  const faqList = document.getElementById('comm-faq-list');
  if (faqList && comm.faqs) {
    faqList.innerHTML = comm.faqs.map(f => `
      <details class="faq-item" name="comm-faq">
        <summary class="faq-summary">
          <span>${f.q}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </summary>
        <div class="faq-content">
          <p>${f.a}</p>
        </div>
      </details>
    `).join('');
  }

  // Pre-fill community in contact form
  const formCommSelect = document.getElementById('inquiry-community-select');
  if (formCommSelect) {
    formCommSelect.value = comm.id;
  }

  // Render Available listings for this community
  const commListings = await window.EHC.getListings({ community: comm.id });
  const listingsContainer = document.getElementById('comm-listings-container');
  if (listingsContainer) {
    if (commListings.length === 0) {
      listingsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 8px; border: 1px solid var(--color-border);">
          <h4 style="margin-bottom: 8px;">No Current Immediate Openings at ${comm.name}</h4>
          <p style="color: var(--color-charcoal-muted); margin-bottom: 16px;">This community is currently at high occupancy. Join our free priority waiting list to be contacted first when a lot or home becomes available.</p>
          <a href="#inquiry-section" class="btn btn-accent">Join ${comm.name} Waiting List</a>
        </div>
      `;
    } else {
      listingsContainer.innerHTML = commListings.map(l => `
        <article class="listing-card">
          <div class="listing-card-image">
            <span class="badge ${l.statusBadge || 'badge-available'} listing-card-status">${l.status}</span>
            <span class="listing-card-type">${l.type}</span>
            <img src="${l.image}" alt="${l.title}" loading="lazy" width="400" height="250">
          </div>
          <div class="listing-card-body">
            <div class="listing-card-community">${l.communityName} • ${l.lotNumber || ''}</div>
            <h4 class="listing-card-title">${l.title}</h4>
            
            <div class="listing-specs">
              ${l.bedrooms ? `<div class="listing-spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>${l.bedrooms} Beds</div>` : ''}
              ${l.bathrooms ? `<div class="listing-spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z"></path><path d="M6 12V5a2 2 0 0 1 2-2h3v9"></path></svg>${l.bathrooms} Baths</div>` : ''}
              ${l.sqft ? `<div class="listing-spec-item">${l.sqft.toLocaleString()} Sq Ft</div>` : ''}
              <div class="listing-spec-item">${l.dimensions || ''}</div>
            </div>

            <div class="listing-price-row">
              <div>
                <div class="listing-price-main">${l.price}</div>
                <div class="listing-price-sub">${l.priceSubtext || ''}</div>
              </div>
            </div>

            <div class="listing-card-footer">
              <a href="listing-detail.html?id=${l.id}" class="btn btn-primary btn-full">View Details</a>
            </div>
          </div>
        </article>
      `).join('');
    }
  }
});

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}
