/**
 * Data Store - Evergreen Heritage Communities
 * Loads data from API endpoints or falls back to local data.
 */

window.EHC = window.EHC || {};

window.EHC.getCommunities = async function() {
  try {
    const res = await fetch('/api/communities');
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) return json.data;
    }
  } catch (e) {
    console.warn('API /api/communities unavailable, loading local fallback data.', e);
  }
  return window.EHC.FALLBACK_COMMUNITIES || [];
};

window.EHC.getListings = async function(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.community && filters.community !== 'all') params.append('community', filters.community);
    if (filters.type && filters.type !== 'all') params.append('type', filters.type);
    if (filters.bedrooms && filters.bedrooms !== 'any') params.append('bedrooms', filters.bedrooms);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const query = params.toString() ? '?' + params.toString() : '';
    const res = await fetch('/api/listings' + query);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (e) {
    console.warn('API /api/listings unavailable, filtering fallback data.', e);
  }

  let list = window.EHC.FALLBACK_LISTINGS || [];
  if (filters.community && filters.community !== 'all') {
    list = list.filter(l => l.communityId === filters.community);
  }
  if (filters.type && filters.type !== 'all') {
    list = list.filter(l => l.typeCategory === filters.type);
  }
  if (filters.bedrooms && filters.bedrooms !== 'any') {
    const minBeds = parseInt(filters.bedrooms, 10);
    list = list.filter(l => l.bedrooms && l.bedrooms >= minBeds);
  }
  if (filters.maxPrice && !isNaN(parseInt(filters.maxPrice, 10))) {
    const cap = parseInt(filters.maxPrice, 10);
    list = list.filter(l => l.priceNum && l.priceNum <= cap);
  }
  return list;
};

// Fallback Embedded Data (ensures 100% offline or static-host capability)
window.EHC.FALLBACK_COMMUNITIES = [
  {
    "id": "oak-ridge",
    "name": "Oak Ridge Estates",
    "slug": "oak-ridge",
    "tagline": "Comfortable, tree-lined manufactured home living in Washington's capital region.",
    "address": "4200 Oak Ridge Way",
    "city": "Olympia",
    "state": "WA",
    "zip": "98516",
    "metro": "South Puget Sound / Capital Region",
    "lat": 47.0379,
    "lng": -122.8207,
    "phone": "(360) 890-3401",
    "email": "oakridge@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 2:00 PM | Sun: Closed",
    "communityType": "All-Ages Family Community",
    "totalLots": 148,
    "availabilityStatus": "Lots & Homes Available",
    "badgeClass": "badge-available",
    "image": "/images/communities/oak-ridge.svg",
    "gallery": [
      "/images/communities/oak-ridge.svg",
      "/images/communities/oak-ridge-street.svg",
      "/images/communities/oak-ridge-clubhouse.svg",
      "/images/communities/oak-ridge-playground.svg"
    ],
    "description": "Oak Ridge Estates is our flagship family-owned community featuring towering shade trees, newly resurfaced two-lane streets, designated two-vehicle off-street parking, a community center, and lighted walkways. Offering a quiet, neighborly atmosphere just minutes from downtown Olympia and Puget Sound.",
    "pricing": {
      "startingLotRent": "$545 / month",
      "homeRentalStarting": "$1,150 / month",
      "homeSaleStarting": "$68,000",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Curbside weekly trash & recycling service, seasonal common-area landscaping",
      "utilitiesSeparate": "City water/sewer (sub-metered to each home), electricity, high-speed fiber internet",
      "leaseTerms": "12-month standard lease term; month-to-month option after year one"
    },
    "amenities": [
      "Pet-Friendly with Fenced Dog Run",
      "Off-Street 2-Car Paved Driveways",
      "Community Clubhouse & Event Hall",
      "Modern Children's Playground",
      "On-Site Friendly Property Management",
      "Lighted Paved Streets with Speed Bumps",
      "High-Speed Fiber Internet Ready",
      "Curbside Trash & Recycling Pickup"
    ],
    "rulesSnapshot": {
      "pets": "Up to 2 domestic pets per household (dogs under 40 lbs; non-aggressive breeds; indoor cats welcome). Leash required in common spaces.",
      "parking": "2 passenger vehicles per home on concrete driveways. No overnight street parking or parking on lawns.",
      "quietHours": "10:00 PM to 7:00 AM daily for peace of all residents.",
      "maintenance": "Residents maintain personal grass cutting within their lot perimeter; community crew handles common grounds.",
      "rvs": "Designated secure RV / camper storage area available for resident lease at $45/mo."
    },
    "nearbyServices": {
      "grocery": "Safeway (1.5 miles), Costco Wholesale (2.8 miles)",
      "schools": "North Thurston High School (1.8 mi), Nisqually Middle (2.2 mi), Meadows Elementary (1.1 mi)",
      "healthcare": "Providence St. Peter Hospital (3.5 miles), MultiCare Indigo Urgent Care (1.2 miles)",
      "commute": "I-5 corridor access (4 mins), Downtown Olympia (12 mins), JBLM Main Gate (18 mins)",
      "recreation": "Tolmie State Park on Puget Sound (4 miles), Regional Athletic Complex (2.5 miles)"
    },
    "faqs": [
      {
        "q": "Can I move my own manufactured home to Oak Ridge Estates?",
        "a": "Yes! We welcome HUD-code compliant homes (2010 or newer) with quality siding and pitched shingle roofs. Our site manager conducts a quick exterior photo review and site coordination at no cost."
      },
      {
        "q": "What utilities are included in the lot rent?",
        "a": "Curbside trash and recycling pickup are included with lot rent. City water, sewer, and electric are individually metered, so you only pay for your household's actual usage."
      },
      {
        "q": "What are the tenant qualification criteria?",
        "a": "We require a completed application, verifiable household income of at least 2.5 times the monthly rent/fee, standard background screening, and positive rental/housing references. Decisions are typically made within 24 to 48 business hours."
      }
    ]
  },
  {
    "id": "pine-valley",
    "name": "Pine Valley Living",
    "slug": "pine-valley",
    "tagline": "Peaceful country charm with tall pines, spacious lots, and dependable staff.",
    "address": "8750 E Valley Pine Road",
    "city": "Spokane",
    "state": "WA",
    "zip": "99206",
    "metro": "Inland Northwest / Spokane Valley",
    "lat": 47.6588,
    "lng": -117.26,
    "phone": "(509) 590-7822",
    "email": "pinevalley@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 4:30 PM | Sat: By Appointment | Sun: Closed",
    "communityType": "All-Ages Quiet Residential Community",
    "totalLots": 112,
    "availabilityStatus": "Homes Available",
    "badgeClass": "badge-available",
    "image": "/images/communities/pine-valley.svg",
    "gallery": [
      "/images/communities/pine-valley.svg",
      "/images/communities/pine-valley-pines.svg",
      "/images/communities/pine-valley-homes.svg",
      "/images/communities/pine-valley-picnic.svg"
    ],
    "description": "Nestled among Inland Northwest ponderosa pine trees just east of Spokane, Pine Valley offers quiet, nature-embracing residential living. Extra-wide lots provide privacy, garden spaces, and a peaceful retreat with city conveniences only 10 minutes away.",
    "pricing": {
      "startingLotRent": "$440 / month",
      "homeRentalStarting": "$980 / month",
      "homeSaleStarting": "$59,000",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Trash collection, deep-well water system maintenance, common grounds mowing",
      "utilitiesSeparate": "Electricity, sub-metered community septic system fee ($28/mo flat), satellite/internet",
      "leaseTerms": "12-month standard lease"
    },
    "amenities": [
      "Pet Friendly (Large Dogs Allowed with Pre-Approval)",
      "Mature Shade Pine Trees on Every Lot",
      "Community Picnic Pavilion & BBQ Grills",
      "On-Site Management Office & Resident Mail Station",
      "Wide Paved Roads with Ample Turnarounds",
      "Clean Community Laundry Facility",
      "Secure Package Lockers",
      "Community Storm Shelter Facility"
    ],
    "rulesSnapshot": {
      "pets": "Pet-friendly with pre-approval (up to 2 pets). Proof of rabies vaccination required.",
      "parking": "2 vehicle spaces per home site. Boat and utility trailer parking permitted in rear yard with manager sign-off.",
      "quietHours": "9:30 PM to 7:00 AM daily.",
      "maintenance": "Residents maintain yard borders; seasonal pine needle clearance services provided biannually by community crew.",
      "rvs": "Short-term visiting family RV hookup available for up to 14 days."
    },
    "nearbyServices": {
      "grocery": "Yoke's Fresh Market (2.1 miles), Rosauers Supermarket (3.5 miles)",
      "schools": "Central Valley High School (3.2 miles), Greenacres Middle (2.1 miles)",
      "healthcare": "MultiCare Valley Hospital (4.5 miles), Providence Sacred Heart (12 miles)",
      "commute": "I-90 (6 mins), Pines Rd / Hwy 27 (4 mins), Downtown Spokane (15 mins)",
      "recreation": "Spokane Valley Mall (8 mins), Dishman Hills Conservation Area (10 mins)"
    },
    "faqs": [
      {
        "q": "Are single-wide and double-wide homes both permitted?",
        "a": "Yes! We have lots suited for standard 16x80 single-wides as well as 28x70 multi-section homes with skirting and front porches."
      },
      {
        "q": "Is the community on city water or well water?",
        "a": "Pine Valley operates a state-inspected, regularly tested private deep-well water system that provides high-quality Washington fresh water."
      },
      {
        "q": "Are there rental homes available right now?",
        "a": "We currently have 2 newly refurbished manufactured homes for rent. Contact management or view our listings tab for current floor plans."
      }
    ]
  },
  {
    "id": "cedar-grove",
    "name": "Cedar Grove Community",
    "slug": "cedar-grove",
    "tagline": "Scenic, quiet South Sound valley living with spacious shaded lots.",
    "address": "3100 River Road",
    "city": "Puyallup",
    "state": "WA",
    "zip": "98371",
    "metro": "Pierce County / South Sound",
    "lat": 47.1954,
    "lng": -122.3029,
    "phone": "(253) 625-1190",
    "email": "cedargrove@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 1:00 PM | Sun: Closed",
    "communityType": "Quiet Residential Community (55+ Friendly)",
    "totalLots": 96,
    "availabilityStatus": "Lots Available",
    "badgeClass": "badge-lots",
    "image": "/images/communities/cedar-grove.svg",
    "gallery": [
      "/images/communities/cedar-grove.svg",
      "/images/communities/cedar-grove-street.svg",
      "/images/communities/cedar-grove-porch.svg",
      "/images/communities/cedar-grove-hall.svg"
    ],
    "description": "Cedar Grove is a tranquil, beautifully maintained manufactured home community located along River Road with scenic views toward Mount Rainier. Designed for residents seeking peace, pride in homeownership, and friendly neighbors.",
    "pricing": {
      "startingLotRent": "$495 / month",
      "homeRentalStarting": "Call for current rental openings",
      "homeSaleStarting": "$74,500",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Curbside trash, common area landscape care, community garden water",
      "utilitiesSeparate": "City of Puyallup municipal water/sewer and electric sub-metered",
      "leaseTerms": "12-month standard lease term"
    },
    "amenities": [
      "Tranquil Setting with Native Cedars & Evergreen Trees",
      "Community Garden Plots with Raised Beds",
      "Social Clubhouse with Kitchen & Library",
      "Horseshoe Pit & Shuffleboard Court",
      "Paved Walking Paths & Benches",
      "Resident Vehicle Maintenance Bay (Clean Air & Water)",
      "Strict 15 MPH Community Speed Limit",
      "On-Site Management with Direct Cell Hotline"
    ],
    "rulesSnapshot": {
      "pets": "Indoor cats and small dogs up to 30 lbs allowed (maximum 2 pets total). Pet registration on file required.",
      "parking": "Designated concrete pads for 2 vehicles. Guest parking spots provided near clubhouse.",
      "quietHours": "9:00 PM to 8:00 AM daily.",
      "maintenance": "Properties must maintain clean skirting, weed-free garden beds, and approved storage sheds.",
      "rvs": "No permanent RV living; clean RV parking lot for residents' personal travel trailers."
    },
    "nearbyServices": {
      "grocery": "Fred Meyer (1.9 miles), Safeway (2.6 miles)",
      "schools": "Puyallup High School (2.5 miles), Kalles Junior High (2.1 miles)",
      "healthcare": "MultiCare Good Samaritan Hospital (3.4 miles), Sound Family Medicine (2.0 miles)",
      "commute": "SR-167 (4 mins), SR-512 (6 mins), Tacoma (15 mins), Sounder Train Station (8 mins)",
      "recreation": "Puyallup Riverwalk Trail (1 mile), Bradley Lake Park (3.5 miles)"
    },
    "faqs": [
      {
        "q": "Is Cedar Grove restricted to 55+?",
        "a": "Cedar Grove welcomes all ages while maintaining a quiet, mature residential atmosphere that is especially popular with active retirees and working professionals."
      },
      {
        "q": "Can I install a carport or storage shed on my lot?",
        "a": "Yes! Manufactured carports and storage sheds up to 10x12 ft matching the home's color palette are permitted upon routine manager architectural review."
      },
      {
        "q": "How do I secure an available lot for my home?",
        "a": "Complete our lot rental application, submit photos of your home, and place a refundable deposit to hold your preferred home site while permits and transport are arranged."
      }
    ]
  },
  {
    "id": "willow-creek",
    "name": "Willow Creek Village",
    "slug": "willow-creek",
    "tagline": "Convenient SW Washington commuter location with new infrastructure and RV sites.",
    "address": "5820 Willow Creek Way",
    "city": "Vancouver",
    "state": "WA",
    "zip": "98661",
    "metro": "Southwest Washington / Clark County",
    "lat": 45.6387,
    "lng": -122.6115,
    "phone": "(360) 387-9940",
    "email": "willowcreek@evergreencommunities.com",
    "officeHours": "Mon–Fri: 8:30 AM – 5:00 PM | Sat: 9:00 AM – 3:00 PM | Sun: Closed",
    "communityType": "All-Ages Community with RV / Trailer Section",
    "totalLots": 165,
    "availabilityStatus": "Rentals & Lots Available",
    "badgeClass": "badge-available",
    "image": "/images/communities/willow-creek.svg",
    "gallery": [
      "/images/communities/willow-creek.svg",
      "/images/communities/willow-creek-entrance.svg",
      "/images/communities/willow-creek-rv.svg",
      "/images/communities/willow-creek-pool.svg"
    ],
    "description": "Located in thriving Clark County, Willow Creek Village features newly paved roadways, upgraded utility pedestals, and a dedicated extended-stay RV and trailer section in addition to permanent manufactured homes. Perfect for commuters and growing families with easy access to Portland.",
    "pricing": {
      "startingLotRent": "$515 / month (Manufactured Home Site)",
      "homeRentalStarting": "$1,100 / month",
      "homeSaleStarting": "$64,000",
      "rvSpacesStarting": "$550 / month (Includes 50-amp, water, sewer, trash)",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Curbside trash, community lighting, street maintenance",
      "utilitiesSeparate": "City of Vancouver electric and water/wastewater sub-metered",
      "leaseTerms": "12-month lease for home sites; flexible 3/6/12-month leases for RV sites"
    },
    "amenities": [
      "Dedicated Full-Hookup RV & Trailer Section (30/50 Amp)",
      "Sparkling Swimming Pool & Sun Deck",
      "Upgraded High-Speed Fiber Internet Ready",
      "Fenced Pet Exercise Park",
      "Full Basketball Half-Court & Play Area",
      "24/7 Security Camera Coverage at Entrances",
      "On-Site Laundromat with Modern Card Readers",
      "Professional Full-Time Maintenance Crew"
    ],
    "rulesSnapshot": {
      "pets": "Pets welcome! Up to 2 pets per site. Pet waste stations placed throughout the community.",
      "parking": "2 designated parking stalls per manufactured home site; 1 vehicle + 1 RV per RV site.",
      "quietHours": "10:00 PM to 7:00 AM daily.",
      "maintenance": "Clean site standard maintained. No outdoor appliance storage or disabled vehicle repairs.",
      "rvs": "RVs in travel section must be fully self-contained, manufactured 2012 or newer, and in clean working condition."
    },
    "nearbyServices": {
      "grocery": "WinCo Foods (1.8 miles), Safeway (2.5 miles)",
      "schools": "Fort Vancouver High School (2.2 miles), McLoughlin Middle (1.8 miles)",
      "healthcare": "PeaceHealth Southwest Medical Center (2.8 miles), Vancouver Clinic (2.1 miles)",
      "commute": "SR-500 (3 mins), I-205 (6 mins), I-5 (8 mins), Downtown Portland (20 mins)",
      "recreation": "Vancouver Waterfront Park (12 mins), Burnt Bridge Creek Trail (5 mins)"
    },
    "faqs": [
      {
        "q": "Do you offer spaces for travel trailers and 5th wheels?",
        "a": "Yes! Our North Section offers 32 dedicated RV/trailer sites with complete 30/50 amp electric, city water, and direct sewer hookups on month-to-month or annual terms."
      },
      {
        "q": "How close is the community to Clark College and downtown Vancouver?",
        "a": "We are approximately 8 to 10 minutes from both Clark College and the vibrant Vancouver waterfront, making this a popular and affordable option for commuters."
      },
      {
        "q": "Is the swimming pool open year-round?",
        "a": "The community swimming pool is open seasonally from Memorial Day weekend through Labor Day with daily maintenance and certified chemical balance testing."
      }
    ]
  }
];

window.EHC.FALLBACK_LISTINGS = [
  {
    "id": "list-101",
    "title": "2024 Clayton 'The Breeze' Double-Wide",
    "communityId": "oak-ridge",
    "communityName": "Oak Ridge Estates",
    "city": "Olympia",
    "state": "WA",
    "type": "Home for Sale",
    "typeCategory": "sale",
    "price": "$89,900",
    "priceNum": 89900,
    "priceSubtext": "+ $545/mo lot rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 1344,
    "dimensions": "28' x 48'",
    "year": 2024,
    "status": "Available Now",
    "statusBadge": "badge-available",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-oakridge-1.svg",
    "gallery": [
      "/images/listings/home-oakridge-1.svg",
      "/images/listings/home-interior-kitchen.svg",
      "/images/listings/home-interior-living.svg",
      "/images/listings/home-interior-master.svg"
    ],
    "description": "Brand new 2024 turn-key double-wide manufactured home situated on a prime corner lot at Oak Ridge Estates. Features an open-concept living area, energy-efficient SmartComfort thermal package, kitchen island with breakfast bar, master suite with walk-in closet and dual vanity bathroom.",
    "features": [
      "Energy Star certified thermal insulation",
      "Full kitchen appliance suite included (refrigerator, stove, dishwasher)",
      "Dedicated laundry room with washer/dryer hookups",
      "Central heat and high-efficiency air conditioning",
      "Covered 8' x 12' front sitting porch",
      "2-car concrete off-street parking pad",
      "Factory warranty included"
    ],
    "lotNumber": "Site #44"
  },
  {
    "id": "list-102",
    "title": "Spacious Shaded Double-Wide Lot #19",
    "communityId": "oak-ridge",
    "communityName": "Oak Ridge Estates",
    "city": "Olympia",
    "state": "WA",
    "type": "Lot Available",
    "typeCategory": "lot",
    "price": "$545 / month",
    "priceNum": 545,
    "priceSubtext": "Standard lot lease",
    "bedrooms": null,
    "bathrooms": null,
    "sqft": 4800,
    "dimensions": "60' x 80'",
    "year": null,
    "status": "Ready for Setup",
    "statusBadge": "badge-lots",
    "availabilityDate": "Available Immediately",
    "image": "/images/listings/lot-oakridge-19.svg",
    "gallery": [
      "/images/listings/lot-oakridge-19.svg",
      "/images/communities/oak-ridge-street.svg"
    ],
    "description": "Premium shaded homesite ready for your HUD-approved manufactured home (single-wide or double-wide up to 28x60). Features mature trees, freshly poured 2-car concrete parking pad, underground 200-amp electrical pedestal, city water/sewer connections, and fiber broadband hookup.",
    "features": [
      "Ready for single or double-wide installation",
      "200-amp modern underground electric service",
      "Direct municipal water & wastewater connections",
      "Poured concrete 2-vehicle parking pad",
      "High-speed fiber conduit at lot line",
      "Curbside trash and recycling included"
    ],
    "lotNumber": "Site #19"
  },
  {
    "id": "list-103",
    "title": "Remodeled 2-Bed / 2-Bath Cozy Home for Rent",
    "communityId": "oak-ridge",
    "communityName": "Oak Ridge Estates",
    "city": "Olympia",
    "state": "WA",
    "type": "Home for Rent",
    "typeCategory": "rent",
    "price": "$1,175 / month",
    "priceNum": 1175,
    "priceSubtext": "Includes lot rent & trash",
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 924,
    "dimensions": "14' x 66'",
    "year": 2018,
    "status": "Available Oct 1",
    "statusBadge": "badge-rentals",
    "availabilityDate": "October 1, 2026",
    "image": "/images/listings/home-rent-oakridge.svg",
    "gallery": [
      "/images/listings/home-rent-oakridge.svg",
      "/images/listings/home-interior-living.svg",
      "/images/listings/home-interior-kitchen.svg"
    ],
    "description": "Nicely updated 2-bedroom, 2-bathroom rental home featuring new luxury vinyl plank flooring throughout, fresh paint, modern kitchen cabinetry, ceiling fans in all bedrooms, and a shaded private backyard area with storage shed.",
    "features": [
      "Pet-friendly (up to 2 small pets with deposit)",
      "New luxury vinyl plank (no carpet)",
      "Central heating & AC",
      "Includes private 8x10 lockable storage shed",
      "2-car parking right in front of home",
      "Convenient proximity to community playground & clubhouse"
    ],
    "lotNumber": "Site #82"
  },
  {
    "id": "list-104",
    "title": "2023 TruMH 'Pride' 3-Bed / 2-Bath",
    "communityId": "pine-valley",
    "communityName": "Pine Valley Living",
    "city": "Spokane",
    "state": "WA",
    "type": "Home for Sale",
    "typeCategory": "sale",
    "price": "$64,500",
    "priceNum": 64500,
    "priceSubtext": "+ $440/mo lot rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 1140,
    "dimensions": "16' x 76'",
    "year": 2023,
    "status": "Available Now",
    "statusBadge": "badge-available",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-pinevalley-1.svg",
    "gallery": [
      "/images/listings/home-pinevalley-1.svg",
      "/images/listings/home-interior-kitchen.svg",
      "/images/listings/home-interior-living.svg"
    ],
    "description": "Like-new 3-bedroom, 2-bath manufactured home set on an extra-large private lot flanked by Inland Northwest pines. Includes modern neutral finishes, spacious split-bedroom floor plan for privacy, large family dining area, and sturdy front/rear decks.",
    "features": [
      "Low maintenance vinyl siding & shingle roof",
      "Split bedroom layout with private master bath",
      "Deep pantry and kitchen island",
      "Thermal pane double-hung windows",
      "Large yard with natural pine shade",
      "Pre-wired for satellite & high-speed broadband"
    ],
    "lotNumber": "Site #27"
  },
  {
    "id": "list-105",
    "title": "Quiet Country Single-Wide Rental Home",
    "communityId": "pine-valley",
    "communityName": "Pine Valley Living",
    "city": "Spokane",
    "state": "WA",
    "type": "Home for Rent",
    "typeCategory": "rent",
    "price": "$980 / month",
    "priceNum": 980,
    "priceSubtext": "Includes lot rent & water",
    "bedrooms": 2,
    "bathrooms": 1.5,
    "sqft": 840,
    "dimensions": "14' x 60'",
    "year": 2017,
    "status": "Available Now",
    "statusBadge": "badge-rentals",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-rent-pinevalley.svg",
    "gallery": [
      "/images/listings/home-rent-pinevalley.svg",
      "/images/listings/home-interior-living.svg"
    ],
    "description": "Affordable, clean, well-cared-for 2-bedroom manufactured home rental in quiet Pine Valley. Enjoy fresh morning coffee on your private wooden deck surrounded by mature trees. Professional on-site maintenance ensures worry-free living.",
    "features": [
      "Water and trash service included in monthly rent",
      "Refurbished kitchen with electric range and refrigerator",
      "Window blinds installed on all windows",
      "Off-street parking for 2 vehicles",
      "Clean community laundry facility steps away",
      "Pet friendly with management approval"
    ],
    "lotNumber": "Site #09"
  },
  {
    "id": "list-106",
    "title": "Spacious Pine-Canopied Lot #52",
    "communityId": "pine-valley",
    "communityName": "Pine Valley Living",
    "city": "Spokane",
    "state": "WA",
    "type": "Lot Available",
    "typeCategory": "lot",
    "price": "$440 / month",
    "priceNum": 440,
    "priceSubtext": "Standard lot lease",
    "bedrooms": null,
    "bathrooms": null,
    "sqft": 5200,
    "dimensions": "65' x 80'",
    "year": null,
    "status": "Ready for Setup",
    "statusBadge": "badge-lots",
    "availabilityDate": "Available Immediately",
    "image": "/images/listings/lot-pinevalley-52.svg",
    "gallery": [
      "/images/listings/lot-pinevalley-52.svg",
      "/images/communities/pine-valley-pines.svg"
    ],
    "description": "One of our most peaceful home sites in Pine Valley. Generous 65-foot frontage accommodates single-wide or double-wide homes with ample room for a flower garden and storage shed. 200A electric pedestal and deep well water connection installed.",
    "features": [
      "Accommodates up to 16x80 single or 28x60 double-wide",
      "High capacity 200-amp power pedestal",
      "Well-water & septic hookups in place",
      "Ample room for approved carport or storage building",
      "Quiet cul-de-sac location"
    ],
    "lotNumber": "Site #52"
  },
  {
    "id": "list-107",
    "title": "Scenic Valley Double-Wide Lot #31",
    "communityId": "cedar-grove",
    "communityName": "Cedar Grove Community",
    "city": "Puyallup",
    "state": "WA",
    "type": "Lot Available",
    "typeCategory": "lot",
    "price": "$495 / month",
    "priceNum": 495,
    "priceSubtext": "Standard lot lease",
    "bedrooms": null,
    "bathrooms": null,
    "sqft": 4500,
    "dimensions": "55' x 82'",
    "year": null,
    "status": "Ready for Setup",
    "statusBadge": "badge-lots",
    "availabilityDate": "Available Immediately",
    "image": "/images/listings/lot-cedargrove-31.svg",
    "gallery": [
      "/images/listings/lot-cedargrove-31.svg",
      "/images/communities/cedar-grove-street.svg"
    ],
    "description": "Prime residential lot in our tranquil, 55+ friendly Cedar Grove community. Backs up to a quiet greenbelt buffer with mature evergreen trees and mountain valley views. Concrete driveway pad, complete utility hookups, and garden plot ready.",
    "features": [
      "Quiet greenbelt buffer behind lot",
      "Full underground utility hookups (water, sewer, electric)",
      "Paved concrete 2-car parking pad",
      "Short walking distance to community garden & library",
      "Quiet 15 MPH strictly enforced speed limit"
    ],
    "lotNumber": "Site #31"
  },
  {
    "id": "list-108",
    "title": "2022 Champion 'Heritage' 3-Bed / 2-Bath",
    "communityId": "cedar-grove",
    "communityName": "Cedar Grove Community",
    "city": "Puyallup",
    "state": "WA",
    "type": "Home for Sale",
    "typeCategory": "sale",
    "price": "$78,500",
    "priceNum": 78500,
    "priceSubtext": "+ $495/mo lot rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 1216,
    "dimensions": "16' x 76'",
    "year": 2022,
    "status": "Available Now",
    "statusBadge": "badge-available",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-cedargrove-1.svg",
    "gallery": [
      "/images/listings/home-cedargrove-1.svg",
      "/images/listings/home-interior-kitchen.svg",
      "/images/listings/home-interior-master.svg"
    ],
    "description": "Immaculate single-wide manufactured home with custom front deck and attached covered carport in Cedar Grove. Upgraded finishes include farmhouse sink, recessed LED lighting, walk-in master shower with bench, and double pane low-E windows.",
    "features": [
      "Custom matching carport and 10x12 utility shed",
      "Low-E insulated windows & smart thermostat",
      "Gourmet kitchen with stainless appliances",
      "Spacious master bedroom with ensuite walk-in shower",
      "Beautiful low-maintenance evergreen landscaping"
    ],
    "lotNumber": "Site #14"
  },
  {
    "id": "list-109",
    "title": "2024 Cavco 4-Bed / 2-Bath Family Double-Wide",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Vancouver",
    "state": "WA",
    "type": "Home for Sale",
    "typeCategory": "sale",
    "price": "$94,000",
    "priceNum": 94000,
    "priceSubtext": "+ $515/mo lot rent",
    "bedrooms": 4,
    "bathrooms": 2,
    "sqft": 1568,
    "dimensions": "28' x 56'",
    "year": 2024,
    "status": "Available Now",
    "statusBadge": "badge-available",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-willowcreek-1.svg",
    "gallery": [
      "/images/listings/home-willowcreek-1.svg",
      "/images/listings/home-interior-living.svg",
      "/images/listings/home-interior-kitchen.svg",
      "/images/listings/home-interior-master.svg"
    ],
    "description": "Exceptional brand-new 4-bedroom family home at Willow Creek Village. Generous open floor plan featuring a massive kitchen island, dining room, utility mudroom, master suite with soaking tub, and three comfortable guest bedrooms.",
    "features": [
      "4 spacious bedrooms with large closets",
      "Kitchen island with pendant lighting and full appliance package",
      "Spa-like master bath with garden tub and separate shower",
      "Full concrete double driveway",
      "Front deck and rear steps installed",
      "Minutes from Clark College and downtown Vancouver"
    ],
    "lotNumber": "Site #68"
  },
  {
    "id": "list-110",
    "title": "Modern 3-Bed / 2-Bath Home for Rent",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Vancouver",
    "state": "WA",
    "type": "Home for Rent",
    "typeCategory": "rent",
    "price": "$1,150 / month",
    "priceNum": 1150,
    "priceSubtext": "Includes lot rent & trash",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 1050,
    "dimensions": "16' x 70'",
    "year": 2020,
    "status": "Available Now",
    "statusBadge": "badge-rentals",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/home-rent-willowcreek.svg",
    "gallery": [
      "/images/listings/home-rent-willowcreek.svg",
      "/images/listings/home-interior-living.svg",
      "/images/listings/home-interior-kitchen.svg"
    ],
    "description": "Move-in ready 3-bedroom rental home with central heat pump/AC, contemporary finishes, all kitchen appliances, and spacious master suite. Located near the community swimming pool and basketball court with easy highway access.",
    "features": [
      "3 bedrooms, 2 full bathrooms",
      "Modern vinyl plank flooring (clean & durable)",
      "High-efficiency heat pump & central air",
      "2-car dedicated parking",
      "Access to community pool and amenities included in rent",
      "Online rent payments and maintenance tracking"
    ],
    "lotNumber": "Site #112"
  },
  {
    "id": "list-111",
    "title": "Full Hookup RV / Trailer Site #N-14",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Vancouver",
    "state": "WA",
    "type": "Lot Available",
    "typeCategory": "lot",
    "price": "$550 / month",
    "priceNum": 550,
    "priceSubtext": "Includes electric, water, sewer, trash",
    "bedrooms": null,
    "bathrooms": null,
    "sqft": 1800,
    "dimensions": "30' x 60'",
    "year": null,
    "status": "Available Now",
    "statusBadge": "badge-available",
    "availabilityDate": "Immediate Move-In",
    "image": "/images/listings/lot-rv-willowcreek.svg",
    "gallery": [
      "/images/listings/lot-rv-willowcreek.svg",
      "/images/communities/willow-creek-rv.svg"
    ],
    "description": "All-inclusive extended stay RV and travel trailer site with 30/50 amp electrical pedestal, city water, direct sewer hookup, and high-speed Wi-Fi. Flat pull-through space with asphalt pad and picnic table.",
    "features": [
      "Complete 30/50-amp electricity included",
      "City water and sewer connections",
      "Trash service & high-speed Wi-Fi included",
      "Accommodates rigs up to 42 feet",
      "Clean laundromat and restrooms nearby",
      "Flexible monthly or seasonal lease terms"
    ],
    "lotNumber": "Site #N-14"
  },
  {
    "id": "list-112",
    "title": "Spacious Double-Wide Manufactured Home Lot #77",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Vancouver",
    "state": "WA",
    "type": "Lot Available",
    "typeCategory": "lot",
    "price": "$515 / month",
    "priceNum": 515,
    "priceSubtext": "Standard lot lease",
    "bedrooms": null,
    "bathrooms": null,
    "sqft": 4600,
    "dimensions": "55' x 84'",
    "year": null,
    "status": "Ready for Setup",
    "statusBadge": "badge-lots",
    "availabilityDate": "Available Immediately",
    "image": "/images/listings/lot-willowcreek-77.svg",
    "gallery": [
      "/images/listings/lot-willowcreek-77.svg",
      "/images/communities/willow-creek-entrance.svg"
    ],
    "description": "Ready-to-build homesite ideal for bringing your own new or modern double-wide manufactured home. High-capacity infrastructure, concrete driveway, and friendly neighbors in Vancouver's premier family community.",
    "features": [
      "Accommodates up to 28x64 double-wide homes",
      "200-amp underground electrical service",
      "City of Vancouver municipal water & wastewater",
      "Concrete double driveway pad in place",
      "Curbside trash & recycling included in lot rent"
    ],
    "lotNumber": "Site #77"
  }
];
