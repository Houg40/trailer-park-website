# Evergreen Heritage Communities — Project Handoff Synopsis

> **Instructions for resuming in a new session:** Paste this entire document into the first prompt of the new conversation followed by:  
> *"This is the current state of an ongoing project — please pick up from here."*

---

## 1. Project Goal
Build and deploy a modern, responsive, highly accessible, and trustworthy website for **Evergreen Heritage Communities**—a family-owned business (est. 1989) operating four manufactured housing communities and trailer parks in Washington State. Success is measured by warm, non-corporate branding, transparent pricing/rules disclosures, fast static and Node.js-compatible delivery, mobile-first thumb navigation, and automated continuous deployment on GitHub Pages.

---

## 2. Current Status
- **Phase**: **Production Live & Iterative Polish**
- **Live Deployment**: Hosted on GitHub Pages via GitHub Actions workflow (`.github/workflows/deploy.yml`).
  - **Live URL**: [https://houg40.github.io/trailer-park-website/](https://houg40.github.io/trailer-park-website/)
  - **Remote Repo**: `https://github.com/Houg40/trailer-park-website.git` (Branch: `main`)
  - **Latest Commit**: `8f672b9` (Added responsive favicons across all HTML pages)
- **Local Dev Server**: Node.js + Express (`server.js`) running on port 3000 (also runs 100% statically on CDN / GitHub Pages without build tools).

---

## 3. Decisions Made & Locked In

### Brand Identity & Styling
- **Business Name**: Evergreen Heritage Communities (Miller family-owned since 1989).
- **Tone**: Grounded, dependable, family-oriented, honest, and clean (explicitly avoiding sterile corporate luxury or low-end trailer tropes).
- **Color Tokens (`public/css/variables.css`)**:
  - Forest Green (`--color-primary`: `#355E3B`, `--color-primary-dark`: `#234127`, `--color-primary-light`: `#4F7955`)
  - Warm Earth Accent (`--color-accent`: `#C9783A`, `--color-accent-hover`: `#B2662E`)
  - Warm Canvas Backgrounds (`--color-warm-beige`: `#F3EFE6`, `--color-cream`: `#FAF8F5`, `--color-white`: `#FFFFFF`)
  - Typography Neutral (`--color-charcoal`: `#2F3437`, `--color-charcoal-muted`: `#575E62`)
- **Typography**: Google Fonts `Montserrat` (headings, 600/700/800) and `Inter` (body, 400/500/600/700).
- **Icons**: Handcrafted SVG icons matching Lucide icon specifications (`HandCoins`, `Wrench`, `PhoneCall`, `ScrollText`, `FileDown`, `MessageCircleQuestion`, `HeartHandshake`, `ReceiptText`, `ClipboardCheck`, `TreePine`).

### Architecture & Dual-Mode Hosting
- **Vanilla Modern Web Architecture**: Semantic HTML5, modern CSS (CSS custom properties, CSS Grid, Flexbox, container queries, `:has()`), Vanilla ES6+ JS. Zero frontend build steps or bloated JS bundles required.
- **Dual Runtime**:
  - **Static Mode**: Works directly via `file://` or GitHub Pages. Data is embedded in `public/js/data.js` as fallback constants (`FALLBACK_COMMUNITIES`, `FALLBACK_LISTINGS`).
  - **Node.js Express Mode (`server.js`)**: Serves public assets, exposes REST API routes (`/api/communities`, `/api/listings`, `/api/inquiries`, `/api/maintenance`), includes Helmet security headers, rate limiting, and Multer file uploads for maintenance photos.
- **Relative Path Convention**: All assets (`images/...`, `css/...`, `js/...`, `favicon.ico`) use root-relative paths **without leading slashes** (`images/...`, not `/images/...`) so they resolve both on localhost root (`/`) and GitHub Pages repository subpath (`/trailer-park-website/`).

### Geographic Setting (Washington State)
All 4 communities and 12 listings are located in Washington State:
1. **Oak Ridge Estates**: `4200 Oak Ridge Way, Olympia, WA 98516` (Capital Region / South Puget Sound). Phone: `(360) 890-3401`. Coordinates: `[47.0379, -122.8207]`.
2. **Pine Valley Living**: `8750 E Valley Pine Rd, Spokane, WA 99206` (Inland Northwest / Spokane Valley, Ponderosa pines, deep well water). Phone: `(509) 590-7822`. Coordinates: `[47.6588, -117.2600]`.
3. **Cedar Grove Community**: `3100 River Road, Puyallup, WA 98371` (Pierce County / Mt. Rainier Valley, 55+ friendly, community gardens). Phone: `(253) 625-1190`. Coordinates: `[47.1954, -122.3029]`.
4. **Willow Creek Village**: `5820 Willow Creek Way, Vancouver, WA 98661` (SW Washington / Clark County, pool, commuter friendly, dedicated 32-site RV section). Phone: `(360) 387-9940`. Coordinates: `[45.6387, -122.6115]`.
- **Main Corporate Office**: `4200 Oak Ridge Way, Olympia, WA 98516` | Phone: `(360) 890-3401`.
- **Governing Law**: Washington State Manufactured/Mobile Home Landlord-Tenant Act (RCW 59.20).
- **Utility Providers**: Puget Sound Energy (PSE), Avista Utilities, Clark Public Utilities.

---

## 4. Concrete Work Completed

### Pages (`public/*.html`)
1. **`index.html`**: Hero section with trust badges, quick stat counter, featured community cards, interactive Leaflet map, family heritage story block, resident CTA banners, modal lead forms, structured data (`schema.org/Organization`).
2. **`communities.html`**: Search and multi-criteria filtering by city and property feature pills (Pet-Friendly, RV Allowed, 55+ Quiet), full side-by-side comparison table, interactive Leaflet map.
3. **`availability.html`**: Filterable listings grid (Homes for Sale, Rentals, Vacant Lots, RV Sites) with dynamic pricing and priority waitlist modal fallback when zero results match.
4. **`community.html`**: Dynamic template driven by URL parameter `?id={slug}`. Renders hero photo, starting lot rent, rules snapshot, fee breakdown, amenities grid, nearby healthcare/schools/transit, FAQs, and listings specific to that location.
5. **`listing-detail.html`**: Dynamic listing page (`?id={list-id}`) with image gallery switcher, lightbox zoom, detailed specs table (beds, baths, sqft, dimensions), features checklist, and pre-filled tour inquiry modal.
6. **`residents.html`**: Resident resource hub with direct links to Pay Rent, Submit Maintenance, Community Rules Handbook, and downloadable resident forms (Pet Agreement, ACH Auto-Pay).
7. **`maintenance.html`**: Resident maintenance request form with emergency notice banner, priority selector, location dropdown, and image upload dropzone.
8. **`about.html`**: Detailed 35-year Miller family story, photography, company core values, philosophy cards with Lucide icons, and community showcase grid.
9. **`contact.html`**: Office addresses, telephone numbers, business hours (PST), emergency hotlines, and interactive inquiry form.
10. **`faq.html`**: 11 categories with real-time live text search filter.
11. **`terms.html` & `privacy.html`**: Equal Housing Opportunity notice, RCW 59.20 compliance, and privacy policies.
12. **`404.html`**: Accessible custom error page with links back to active communities and search.

### Assets & Media (`public/images/`)
- **`page-header-bg.png`**: Panoramic neighborhood streetscape banner overlaid with forest green gradient applied across all secondary page headers (`.community-header`).
- **Real Community Photos**:
  - `hero-community.jpg`: Neighborhood entrance and tree-lined streetscape.
  - `family-team.jpg`: The Miller family photo featured on `about.html` and `index.html`.
  - `listings/home-oakridge-1.jpg`, `home-pinevalley-1.jpg`, `home-cedargrove-1.jpg`, `home-willowcreek-1.jpg`, `home-rent-oakridge.jpg`: Real exterior manufactured home photos reused across all 12 listings, fallback datasets, and showcase cards.
- **Favicon Suite**: `public/favicon.svg` (crisp scalable evergreen emblem), `public/favicon-32x32.png`, `public/favicon-192x192.png` (Apple touch icon), and `public/favicon.ico`.

### JavaScript Engine (`public/js/`)
- **`data.js`**: Unified data layer. Fetches from Express API when available or seamlessly falls back to embedded `FALLBACK_COMMUNITIES` (4 items) and `FALLBACK_LISTINGS` (12 items).
- **`map.js`**: Leaflet / OpenStreetMap integration with custom green home pin markers, auto-bounding over Washington State (`[47.2, -120.5]`), popup cards, and turn-by-turn Google Maps links.
- **`communities.js`**: Live client-side filtering by city, status, and feature pills.
- **`availability.js`**: Filter handling for listings, keyword search, bedroom/pricing count, and waitlist modal trigger.
- **`community-detail.js`**: Reads URL search parameters, populates community metadata, pricing tables, rules, and localized listings.
- **`listing-detail.js`**: Populates listing specs, thumbnail image switcher, and modal inquiry pre-fill.
- **`faq.js`**: Instant accordion toggle and live keyword search filter.
- **`forms.js`**: Honeypot anti-spam protection, input validation, and asynchronous submission handling with toast notifications.
- **`app.js`**: Accessible mobile navigation drawer, skip-links, modal management, and full-screen image lightbox.

---

## 5. In Progress / Partially Done
- **Form Endpoints in Pure Static Mode**: The inquiry and maintenance forms make `POST` requests to Express endpoints (`/api/inquiries`, `/api/maintenance`). When running on GitHub Pages (static), `forms.js` gracefully intercepts network fallbacks and displays a friendly success toast, but no third-party serverless service (like Formspree or EmailJS) is currently hooked up for static email delivery.

---

## 6. Open Questions / Undecided Items
1. **Static Form Submissions**: Should we connect an external free static form provider (e.g., Formspree, Formkeep, or Netlify Forms) so that inquiries submitted on GitHub Pages land directly in the client's email inbox?
2. **Resident Portal Authentication**: The "Pay Rent Online" button on `residents.html` currently points to an external anchor modal/placeholder. Should this link directly to a third-party property management portal (e.g., AppFolio, Buildium, or RentManager)?
3. **Domain Name**: The site is currently on `https://houg40.github.io/trailer-park-website/`. A custom domain (e.g., `evergreencommunitieswa.com`) can be configured in GitHub Pages settings whenever acquired.

---

## 7. Immediate Next Steps (Priority Order)
1. **Form Delivery Integration (if required)**: Add a webhook or Formspree endpoint to `public/js/forms.js` for production lead delivery on static hosting.
2. **Custom Domain / CNAME (if provided by user)**: Add a `CNAME` file to `public/` and update GitHub Pages settings when a custom domain is ready.
3. **SEO & Analytics (optional)**: Add Google Analytics 4 (GA4) or Search Console verification tag to `public/index.html` if desired by the client.

---

## 8. Key Context & Constraints
- **Do NOT introduce frontend build tools** (Vite, Webpack, Tailwind CLI, React, etc.) unless explicitly requested. The repository is intentionally designed with pure HTML/CSS/JS so non-technical stakeholders can edit files directly without compilation errors.
- **Never use absolute root URLs with leading slashes (`/images/...`)** for static assets. Always use relative URLs (`images/...`) to ensure GitHub Pages subpaths (`/trailer-park-website/`) do not break.
- **High Accessibility Standard**: All buttons must maintain WCAG 2.2 AA contrast ratios. In dark green banners (`.section-primary`), links and buttons must have explicitly locked high-contrast colors (white/cream text, never dark charcoal).
- **All git pushes to `main` auto-deploy**: The repo has a working GitHub Actions deployment workflow. Every push to `main` triggers a live rebuild and deploy in ~15 seconds.
