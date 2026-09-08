/**
 * Availability.js - Available Homes & Lots Filtering & Grid
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('listings-container');
  if (!container) return;

  const filterComm = document.getElementById('filter-comm');
  const filterType = document.getElementById('filter-type');
  const filterBeds = document.getElementById('filter-beds');
  const filterSearch = document.getElementById('filter-search');
  const countEl = document.getElementById('listings-count');

  // Check URL params for preset filters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('community') && filterComm) {
    filterComm.value = urlParams.get('community');
  }
  if (urlParams.get('type') && filterType) {
    filterType.value = urlParams.get('type');
  }

  async function updateListings() {
    const filters = {
      community: filterComm ? filterComm.value : 'all',
      type: filterType ? filterType.value : 'all',
      bedrooms: filterBeds ? filterBeds.value : 'any'
    };

    let list = await window.EHC.getListings(filters);

    if (filterSearch && filterSearch.value.trim() !== '') {
      const q = filterSearch.value.toLowerCase().trim();
      list = list.filter(l => 
        l.title.toLowerCase().includes(q) ||
        l.communityName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      );
    }

    renderListings(list);
  }

  if (filterComm) filterComm.addEventListener('change', updateListings);
  if (filterType) filterType.addEventListener('change', updateListings);
  if (filterBeds) filterBeds.addEventListener('change', updateListings);
  if (filterSearch) filterSearch.addEventListener('input', updateListings);

  // Initial load
  updateListings();
});

function renderListings(list) {
  const container = document.getElementById('listings-container');
  const countEl = document.getElementById('listings-count');

  if (countEl) {
    countEl.textContent = `${list.length} ${list.length === 1 ? 'Listing' : 'Listings'} Available`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 24px; background: #fff; border-radius: 8px; border: 1px solid var(--color-border);">
        <h3 style="margin-bottom: 8px;">No Current Listings Match Your Search</h3>
        <p style="color: var(--color-charcoal-muted); max-width: 540px; margin: 0 auto 20px auto;">
          Our lots and homes move quickly! Join our free priority waiting list and we'll notify you as soon as a matching home or lot opens up.
        </p>
        <button type="button" class="btn btn-accent" onclick="window.openModal('waitlist-modal')">Join Priority Waiting List</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(l => `
    <article class="listing-card">
      <div class="listing-card-image">
        <span class="badge ${l.statusBadge || 'badge-available'} listing-card-status">${l.status}</span>
        <span class="listing-card-type">${l.type}</span>
        <img src="${l.image}" alt="${l.title}" loading="lazy" width="400" height="250">
      </div>
      <div class="listing-card-body">
        <div class="listing-card-community">${l.communityName} • ${l.city}, ${l.state}</div>
        <h3 class="listing-card-title">${l.title}</h3>
        
        <div class="listing-specs">
          ${l.bedrooms ? `<div class="listing-spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>${l.bedrooms} Beds</div>` : ''}
          ${l.bathrooms ? `<div class="listing-spec-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z"></path><path d="M6 12V5a2 2 0 0 1 2-2h3v9"></path></svg>${l.bathrooms} Baths</div>` : ''}
          ${l.sqft ? `<div class="listing-spec-item">${l.sqft.toLocaleString()} Sq Ft</div>` : ''}
          <div class="listing-spec-item">${l.dimensions || 'Spacious Site'}</div>
        </div>

        <p style="font-size: 0.88rem; color: var(--color-charcoal-muted); margin-bottom: 16px; line-height: 1.4;">
          ${l.description.substring(0, 100)}...
        </p>

        <div class="listing-price-row">
          <div>
            <div class="listing-price-main">${l.price}</div>
            <div class="listing-price-sub">${l.priceSubtext || ''}</div>
          </div>
          <div style="font-size: 0.75rem; color: var(--color-charcoal-light); font-weight: 600;">
            ${l.availabilityDate}
          </div>
        </div>

        <div class="listing-card-footer">
          <a href="/listing-detail.html?id=${l.id}" class="btn btn-outline" style="flex:1;">View Details</a>
          <button type="button" class="btn btn-accent" style="flex:1;" onclick="openInquiryForListing('${l.id}', '${l.title.replace(/'/g, "\\'")}', '${l.communityName.replace(/'/g, "\\'")}')">Inquire</button>
        </div>
      </div>
    </article>
  `).join('');
}

window.openInquiryForListing = function(id, title, community) {
  const commSelect = document.getElementById('inquiry-community');
  const interestInput = document.getElementById('inquiry-interest');
  const messageInput = document.getElementById('inquiry-message');

  if (commSelect) commSelect.value = community;
  if (interestInput) interestInput.value = `Listing: ${title}`;
  if (messageInput) messageInput.value = `Hello, I am interested in learning more about "${title}" at ${community}. Please contact me with availability and tour details.`;

  window.openModal('inquiry-modal');
};
