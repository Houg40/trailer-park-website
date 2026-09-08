/**
 * Map.js - Interactive Leaflet / OpenStreetMap Multi-Property Map
 * Evergreen Heritage Communities
 */

document.addEventListener('DOMContentLoaded', async () => {
  const mapElement = document.getElementById('properties-map');
  if (!mapElement) return;

  // Check if Leaflet is available
  if (typeof L === 'undefined') {
    mapElement.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--color-charcoal-muted);">
        <p>Map loading...</p>
      </div>
    `;
    return;
  }

  const communities = await window.EHC.getCommunities();

  // Initialize map centered roughly on Washington State
  const map = L.map('properties-map', {
    scrollWheelZoom: false
  }).setView([47.2, -120.5], 7);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Custom Evergreen Pin Icon
  const customPin = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        background-color: #355E3B;
        color: #FFFFFF;
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid #FFFFFF;
      ">
        <svg style="transform: rotate(45deg); width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });

  const markers = [];

  communities.forEach(c => {
    if (c.lat && c.lng) {
      const popupHtml = `
        <div style="min-width: 220px; padding: 4px 2px;">
          <span class="badge ${c.badgeClass || 'badge-available'}" style="margin-bottom: 6px;">${c.availabilityStatus}</span>
          <h4 style="margin: 4px 0 2px 0; color: #234127; font-size: 1.05rem;">${c.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 0.8rem; color: #575E62;">${c.address}, ${c.city}, ${c.state}</p>
          <div style="font-weight: bold; color: #355E3B; font-size: 0.88rem; margin-bottom: 10px;">
            Lot Rent from ${c.pricing.startingLotRent.split('/')[0]}/mo
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="community.html?id=${c.id}" class="btn btn-sm btn-primary" style="padding: 6px 10px; font-size: 0.78rem; text-decoration: none; color: #FFFFFF !important;">View Community</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="padding: 6px 10px; font-size: 0.78rem; text-decoration: none; color: #2C3E2D !important;">Directions</a>
          </div>
        </div>
      `;

      const marker = L.marker([c.lat, c.lng], { icon: customPin }).addTo(map);
      marker.bindPopup(popupHtml);
      markers.push(marker);
    }
  });

  // Fit bounds to markers
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  }
});
