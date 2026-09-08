/**
 * Listing-Detail.js - Populates the Individual Listing Detail Page
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id') || 'list-101';

  const listings = await window.EHC.getListings();
  const listing = listings.find(l => l.id === listingId) || listings[0];

  if (!listing) return;

  // Title & Breadcrumb
  document.title = `${listing.title} | ${listing.communityName} | Evergreen Heritage Communities`;
  
  setText('listing-breadcrumb-title', listing.title);
  setText('listing-title', listing.title);
  setText('listing-community-name', `${listing.communityName} • ${listing.city}, ${listing.state}`);
  setText('listing-badge', listing.status);
  setText('listing-type', listing.type);
  setText('listing-price', listing.price);
  setText('listing-price-sub', listing.priceSubtext || '');
  setText('listing-desc', listing.description);
  setText('listing-avail-date', listing.availabilityDate);

  // Link to community page
  const commLink = document.getElementById('listing-community-link');
  if (commLink) {
    commLink.href = `/community.html?id=${listing.communityId}`;
    commLink.textContent = `Explore ${listing.communityName}`;
  }

  // Photos
  const mainPhoto = document.getElementById('listing-main-img');
  if (mainPhoto) {
    mainPhoto.src = listing.image;
    mainPhoto.alt = listing.title;
    mainPhoto.onclick = () => window.openLightbox(mainPhoto.src, listing.title);
  }

  const thumbsContainer = document.getElementById('listing-thumbs');
  if (thumbsContainer && listing.gallery) {
    thumbsContainer.innerHTML = listing.gallery.map((imgSrc, i) => `
      <button type="button" class="listing-thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchPhoto('${imgSrc}', this)">
        <img src="${imgSrc}" alt="${listing.title} Thumbnail ${i + 1}">
      </button>
    `).join('');
  }

  // Specs Table
  const specsTable = document.getElementById('listing-specs-tbody');
  if (specsTable) {
    specsTable.innerHTML = `
      <tr><td>Housing Type</td><td>${listing.type}</td></tr>
      ${listing.bedrooms ? `<tr><td>Bedrooms</td><td>${listing.bedrooms} Beds</td></tr>` : ''}
      ${listing.bathrooms ? `<tr><td>Bathrooms</td><td>${listing.bathrooms} Baths</td></tr>` : ''}
      ${listing.sqft ? `<tr><td>Square Footage</td><td>${listing.sqft.toLocaleString()} sq. ft.</td></tr>` : ''}
      ${listing.dimensions ? `<tr><td>Dimensions</td><td>${listing.dimensions}</td></tr>` : ''}
      ${listing.year ? `<tr><td>Home Year</td><td>${listing.year}</td></tr>` : ''}
      ${listing.lotNumber ? `<tr><td>Site Number</td><td>${listing.lotNumber}</td></tr>` : ''}
      <tr><td>Availability</td><td>${listing.availabilityDate}</td></tr>
      <tr><td>Community</td><td><a href="/community.html?id=${listing.communityId}">${listing.communityName}</a></td></tr>
    `;
  }

  // Features List
  const featuresList = document.getElementById('listing-features-list');
  if (featuresList && listing.features) {
    featuresList.innerHTML = listing.features.map(f => `
      <li style="display:flex; align-items:center; gap:8px; font-size: 0.95rem; color: var(--color-charcoal);">
        <svg style="width:18px; height:18px; color:var(--color-primary); flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${f}
      </li>
    `).join('');
  }

  // Pre-fill inquiry form
  const messageInput = document.getElementById('inquiry-message');
  if (messageInput) {
    messageInput.value = `Hello, I would like to schedule a tour or receive more information about "${listing.title}" (${listing.communityName}, ${listing.lotNumber || ''}).`;
  }
});

window.switchPhoto = function(src, btn) {
  const mainPhoto = document.getElementById('listing-main-img');
  if (mainPhoto) mainPhoto.src = src;

  document.querySelectorAll('.listing-thumb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}
