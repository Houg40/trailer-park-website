/**
 * Communities.js - Renders & Filters Community Cards
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('communities-container');
  if (!container) return;

  const communities = await window.EHC.getCommunities();
  renderCommunities(communities);

  // Setup filters if present on page
  const cityFilter = document.getElementById('filter-city');
  const availFilter = document.getElementById('filter-availability');
  const searchInput = document.getElementById('filter-search');
  const filterPills = document.querySelectorAll('.filter-pill[data-filter-prop]');

  function applyFilters() {
    let filtered = [...communities];

    if (cityFilter && cityFilter.value !== 'all') {
      filtered = filtered.filter(c => c.city.toLowerCase() === cityFilter.value.toLowerCase());
    }

    if (availFilter && availFilter.value !== 'all') {
      const val = availFilter.value.toLowerCase();
      filtered = filtered.filter(c => c.availabilityStatus.toLowerCase().includes(val));
    }

    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }

    // Active pill filters
    filterPills.forEach(pill => {
      if (pill.classList.contains('active')) {
        const prop = pill.getAttribute('data-filter-prop');
        if (prop === 'pet-friendly') {
          filtered = filtered.filter(c => c.amenities.some(a => a.toLowerCase().includes('pet')));
        } else if (prop === 'rv-allowed') {
          filtered = filtered.filter(c => c.amenities.some(a => a.toLowerCase().includes('rv')));
        } else if (prop === 'quiet-55') {
          filtered = filtered.filter(c => c.communityType.toLowerCase().includes('55+') || c.tagline.toLowerCase().includes('quiet'));
        }
      }
    });

    renderCommunities(filtered);
  }

  if (cityFilter) cityFilter.addEventListener('change', applyFilters);
  if (availFilter) availFilter.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      applyFilters();
    });
  });
});

function renderCommunities(list) {
  const container = document.getElementById('communities-container');
  const countElem = document.getElementById('communities-count');

  if (countElem) {
    countElem.textContent = `${list.length} ${list.length === 1 ? 'Community' : 'Communities'} Found`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 24px; background: #fff; border-radius: 8px; border: 1px solid var(--color-border);">
        <h3 style="margin-bottom: 8px;">No matching communities found</h3>
        <p style="color: var(--color-charcoal-muted); margin-bottom: 24px;">Try adjusting your search criteria or view all of our locations.</p>
        <button type="button" class="btn btn-outline" onclick="location.reload()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(c => `
    <article class="community-card" data-id="${c.id}">
      <div class="community-card-image">
        <span class="badge ${c.badgeClass || 'badge-available'} community-card-badge">${c.availabilityStatus}</span>
        <img src="${c.image}" alt="${c.name} in ${c.city}, ${c.state}" loading="lazy" width="400" height="250">
      </div>
      <div class="community-card-body">
        <div class="community-card-location">${c.city}, ${c.state} • ${c.metro || ''}</div>
        <h3 class="community-card-title">${c.name}</h3>
        <p class="community-card-desc">${c.tagline || c.description.substring(0, 120) + '...'}</p>
        
        <div class="community-card-pricing">
          <div>
            <div class="price-label">Starting Lot Rent</div>
            <div class="price-val">${c.pricing.startingLotRent.split('/')[0]}<span style="font-size:0.75rem; font-weight:normal;">/mo</span></div>
          </div>
          <div style="text-align: right;">
            <div class="price-label">Total Homesites</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-charcoal);">${c.totalLots} Lots</div>
          </div>
        </div>

        <div class="community-card-amenities">
          ${c.amenities.slice(0, 3).map(a => `
            <span class="amenity-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${a.split('(')[0].trim()}
            </span>
          `).join('')}
        </div>

        <div class="community-card-footer">
          <a href="/community.html?id=${c.id}" class="btn btn-primary btn-full">View Community</a>
        </div>
      </div>
    </article>
  `).join('');
}
