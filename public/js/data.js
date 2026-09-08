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

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`/api/listings${query}`);
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
    "tagline": "Comfortable, tree-lined manufactured home living in northern Austin metro.",
    "address": "4200 Oak Ridge Parkway",
    "city": "Round Rock",
    "state": "TX",
    "zip": "78665",
    "metro": "Austin Metro Area",
    "lat": 30.5083,
    "lng": -97.6789,
    "phone": "(512) 890-3401",
    "email": "oakridge@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 2:00 PM",
    "communityType": "All-Ages Family Community",
    "totalLots": 148,
    "availabilityStatus": "Lots & Homes Available",
    "badgeClass": "badge-available",
    "image": "images/communities/oak-ridge.svg",
    "gallery": [
      "images/communities/oak-ridge.svg",
      "images/communities/oak-ridge-street.svg",
      "images/communities/oak-ridge-clubhouse.svg",
      "images/communities/oak-ridge-playground.svg"
    ],
    "description": "Oak Ridge Estates is our flagship family-owned community featuring towering shade oaks, newly resurfaced two-lane streets, designated two-vehicle off-street parking, a community center, and lighted walkways. Offering a quiet, neighborly atmosphere just 25 minutes north of downtown Austin.",
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
      "grocery": "H-E-B Plus! (1.4 miles), Walmart Supercenter (2.8 miles)",
      "schools": "Stony Point High School (1.8 mi), Hopewell Middle (2.2 mi), Caldwell Elementary (1.1 mi)",
      "healthcare": "Baylor Scott & White Medical Center (3.5 miles), Round Rock Urgent Care (1.2 miles)",
      "commute": "IH-35 access (5 mins), SH-130 Tollway (8 mins), Austin Airport (32 mins)",
      "recreation": "Old Settlers 640-acre Park & Sports Complex (4 miles), Public Library (2.5 miles)"
    }
  },
  {
    "id": "pine-valley",
    "name": "Pine Valley Living",
    "slug": "pine-valley",
    "tagline": "Peaceful country charm with tall pines, spacious lots, and dependable staff.",
    "address": "8750 County Road 134",
    "city": "Tyler",
    "state": "TX",
    "zip": "75703",
    "metro": "East Texas Piney Woods",
    "lat": 32.3513,
    "lng": -95.3011,
    "phone": "(903) 590-7822",
    "email": "pinevalley@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 4:30 PM | Sat: By Appointment",
    "communityType": "All-Ages Quiet Residential Community",
    "totalLots": 112,
    "availabilityStatus": "Homes Available",
    "badgeClass": "badge-available",
    "image": "images/communities/pine-valley.svg",
    "gallery": [
      "images/communities/pine-valley.svg",
      "images/communities/pine-valley-pines.svg",
      "images/communities/pine-valley-homes.svg",
      "images/communities/pine-valley-picnic.svg"
    ],
    "description": "Nestled among East Texas pine trees just south of Tyler, Pine Valley offers quiet, nature-embracing residential living. Extra-wide lots provide privacy, garden spaces, and a peaceful retreat with city conveniences only 10 minutes away.",
    "pricing": {
      "startingLotRent": "$440 / month",
      "homeRentalStarting": "$980 / month",
      "homeSaleStarting": "$59,000",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Trash collection, well-water system maintenance, common grounds mowing",
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
      "Storm Shelter Facility"
    ],
    "rulesSnapshot": {
      "pets": "Pet-friendly with pre-approval (up to 2 pets). Proof of rabies vaccination required.",
      "parking": "2 vehicle spaces per home site. Boat and utility trailer parking permitted in rear yard with manager sign-off.",
      "quietHours": "9:30 PM to 7:00 AM daily.",
      "maintenance": "Residents maintain yard borders; pine needle clearance services provided biannually by community crew.",
      "rvs": "Short-term visiting family RV hookup available for up to 14 days."
    },
    "nearbyServices": {
      "grocery": "Brookshire's (2.3 miles), ALDI (4.1 miles)",
      "schools": "Whitehouse ISD / Tyler Legacy High (3.8 miles), Holloway 6th Grade (2.5 miles)",
      "healthcare": "UT Health Tyler East Texas Medical Center (6.2 miles), Christus Trinity Mother Frances (5.8 miles)",
      "commute": "Loop 323 (7 mins), Toll 49 (4 mins), Dallas/Fort Worth (95 mins)",
      "recreation": "Lake Tyler recreation & boat ramps (12 mins), Faulkner Park (3.5 miles)"
    }
  },
  {
    "id": "cedar-grove",
    "name": "Cedar Grove Community",
    "slug": "cedar-grove",
    "tagline": "Scenic, quiet Hill Country living with spacious shaded lots.",
    "address": "3100 Gruene River Road",
    "city": "New Braunfels",
    "state": "TX",
    "zip": "78130",
    "metro": "San Antonio North / Hill Country",
    "lat": 29.7030,
    "lng": -98.1245,
    "phone": "(830) 625-1190",
    "email": "cedargrove@evergreencommunities.com",
    "officeHours": "Mon–Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 1:00 PM",
    "communityType": "Quiet Residential Community (55+ Friendly)",
    "totalLots": 96,
    "availabilityStatus": "Lots Available",
    "badgeClass": "badge-lots",
    "image": "images/communities/cedar-grove.svg",
    "gallery": [
      "images/communities/cedar-grove.svg",
      "images/communities/cedar-grove-street.svg",
      "images/communities/cedar-grove-porch.svg",
      "images/communities/cedar-grove-hall.svg"
    ],
    "description": "Cedar Grove is a tranquil, beautifully maintained manufactured home community located minutes from historic Gruene and the Guadalupe River. Designed for residents seeking peace, pride in homeownership, and friendly neighbors.",
    "pricing": {
      "startingLotRent": "$495 / month",
      "homeRentalStarting": "Call for current rental openings",
      "homeSaleStarting": "$74,500",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Curbside trash, common area landscape care, community garden water",
      "utilitiesSeparate": "New Braunfels Utilities (NBU) city water/sewer and electric sub-metered",
      "leaseTerms": "12-month standard lease term"
    },
    "amenities": [
      "Tranquil Setting with Native Cedar & Oak Trees",
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
      "grocery": "H-E-B New Braunfels (2.1 miles), Natural Grocers (3.4 miles)",
      "schools": "Canyon High School (3.1 miles), Church Hill Middle (2.4 miles)",
      "healthcare": "Resolute Health Hospital (4.2 miles), Christus Santa Rosa Hospital (3.9 miles)",
      "commute": "IH-35 (6 mins), TX-46 (4 mins), San Antonio (35 mins), San Marcos (18 mins)",
      "recreation": "Gruene Historic District (2.5 miles), Landa Park & Comal Springs (3.8 miles)"
    }
  },
  {
    "id": "willow-creek",
    "name": "Willow Creek Village",
    "slug": "willow-creek",
    "tagline": "Convenient DFW commuter location with new infrastructure and RV sites.",
    "address": "5820 Willow Creek Lane",
    "city": "Denton",
    "state": "TX",
    "zip": "76208",
    "metro": "North Dallas / Denton County",
    "lat": 33.2148,
    "lng": -97.1331,
    "phone": "(940) 387-9940",
    "email": "willowcreek@evergreencommunities.com",
    "officeHours": "Mon–Fri: 8:30 AM – 5:00 PM | Sat: 9:00 AM – 3:00 PM",
    "communityType": "All-Ages Community with RV / Trailer Section",
    "totalLots": 165,
    "availabilityStatus": "Rentals & Lots Available",
    "badgeClass": "badge-available",
    "image": "images/communities/willow-creek.svg",
    "gallery": [
      "images/communities/willow-creek.svg",
      "images/communities/willow-creek-entrance.svg",
      "images/communities/willow-creek-rv.svg",
      "images/communities/willow-creek-pool.svg"
    ],
    "description": "Located right in thriving Denton County, Willow Creek Village features newly paved roadways, upgraded utility pedestals, and a dedicated extended-stay RV and trailer section in addition to permanent manufactured homes. Perfect for commuters and growing families.",
    "pricing": {
      "startingLotRent": "$515 / month (Manufactured Home Site)",
      "homeRentalStarting": "$1,100 / month",
      "homeSaleStarting": "$64,000",
      "rvSpacesStarting": "$550 / month (Includes 50-amp, water, sewer, trash)",
      "applicationFee": "$35 per adult applicant",
      "securityDeposit": "Equivalent to 1 month's rent (refundable)",
      "utilitiesIncluded": "Curbside trash, community lighting, street maintenance",
      "utilitiesSeparate": "City of Denton electric and water/wastewater sub-metered",
      "leaseTerms": "12-month lease for home sites; flexible 3/6/12-month leases for RV sites"
    },
    "amenities": [
      "Dedicated Full-Hookup RV & Trailer Section (30/50 Amp)",
      "Sparkling Swimming Pool & Sun Deck",
      "Upgraded High-Speed Spectrum & Frontier Fiber",
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
      "grocery": "Kroger Marketplace (1.7 miles), WinCo Foods (3.2 miles)",
      "schools": "Denton High School (2.6 miles), Calhoun Middle (1.9 miles), Newton Rayzor Elementary (1.3 miles)",
      "healthcare": "Medical City Denton Hospital (3.1 miles), Texas Health Presbyterian Denton (4.5 miles)",
      "commute": "I-35E & I-35W split (4 mins), Loop 288 (3 mins), Downtown Dallas (40 mins), DFW Airport (30 mins)",
      "recreation": "Ray Roberts Lake State Park (15 mins), Denton Square Historic Downtown (2.8 miles)"
    }
  }
];

window.EHC.FALLBACK_LISTINGS = [
  {
    "id": "list-101",
    "title": "2024 Clayton 'The Breeze' Double-Wide",
    "communityId": "oak-ridge",
    "communityName": "Oak Ridge Estates",
    "city": "Round Rock",
    "state": "TX",
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
    "image": "images/listings/home-oakridge-1.svg",
    "gallery": [
      "images/listings/home-oakridge-1.svg",
      "images/listings/home-interior-kitchen.svg",
      "images/listings/home-interior-living.svg",
      "images/listings/home-interior-master.svg"
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
    "city": "Round Rock",
    "state": "TX",
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
    "image": "images/listings/lot-oakridge-19.svg",
    "gallery": [
      "images/listings/lot-oakridge-19.svg",
      "images/communities/oak-ridge-street.svg"
    ],
    "description": "Premium shaded homesite ready for your HUD-approved manufactured home (single-wide or double-wide up to 28x60). Features mature oak trees, freshly poured 2-car concrete parking pad, underground 200-amp electrical pedestal, city water/sewer connections, and fiber broadband hookup.",
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
    "city": "Round Rock",
    "state": "TX",
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
    "image": "images/listings/home-rent-oakridge.svg",
    "gallery": [
      "images/listings/home-rent-oakridge.svg",
      "images/listings/home-interior-living.svg",
      "images/listings/home-interior-kitchen.svg"
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
    "city": "Tyler",
    "state": "TX",
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
    "image": "images/listings/home-pinevalley-1.svg",
    "gallery": [
      "images/listings/home-pinevalley-1.svg",
      "images/listings/home-interior-kitchen.svg",
      "images/listings/home-interior-living.svg"
    ],
    "description": "Like-new 3-bedroom, 2-bath manufactured home set on an extra-large private lot flanked by East Texas pines. Includes modern neutral finishes, spacious split-bedroom floor plan for privacy, large family dining area, and sturdy front/rear decks.",
    "features": [
      "Low maintenance vinyl siding & shingle roof",
      "Split bedroom layout with private master bath",
      "Deep pantry and kitchen island",
      "Thermal pane double-hung windows",
      "Large yard with natural pine shade",
      "Pre-wired for satellite & high-speed DSL"
    ],
    "lotNumber": "Site #27"
  },
  {
    "id": "list-105",
    "title": "Quiet Country Single-Wide Rental Home",
    "communityId": "pine-valley",
    "communityName": "Pine Valley Living",
    "city": "Tyler",
    "state": "TX",
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
    "image": "images/listings/home-rent-pinevalley.svg",
    "gallery": [
      "images/listings/home-rent-pinevalley.svg",
      "images/listings/home-interior-living.svg"
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
    "city": "Tyler",
    "state": "TX",
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
    "image": "images/listings/lot-pinevalley-52.svg",
    "gallery": [
      "images/listings/lot-pinevalley-52.svg",
      "images/communities/pine-valley-pines.svg"
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
    "title": "Hill Country Double-Wide Lot #31",
    "communityId": "cedar-grove",
    "communityName": "Cedar Grove Community",
    "city": "New Braunfels",
    "state": "TX",
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
    "image": "images/listings/lot-cedargrove-31.svg",
    "gallery": [
      "images/listings/lot-cedargrove-31.svg",
      "images/communities/cedar-grove-street.svg"
    ],
    "description": "Prime residential lot in our tranquil, 55+ friendly Cedar Grove community. Backs up to a quiet greenbelt buffer with heritage mountain cedars. Concrete driveway pad, complete utility hookups, and lawn irrigation connection ready.",
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
    "city": "New Braunfels",
    "state": "TX",
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
    "image": "images/listings/home-cedargrove-1.svg",
    "gallery": [
      "images/listings/home-cedargrove-1.svg",
      "images/listings/home-interior-kitchen.svg",
      "images/listings/home-interior-master.svg"
    ],
    "description": "Immaculate single-wide manufactured home with custom front deck and attached covered carport in Cedar Grove. Upgraded finishes include farmhouse sink, recessed LED lighting, walk-in master shower with bench, and double pane low-E windows.",
    "features": [
      "Custom matching carport and 10x12 utility shed",
      "Low-E insulated windows & smart thermostat",
      "Gourmet kitchen with stainless appliances",
      "Spacious master bedroom with ensuite walk-in shower",
      "Beautiful low-maintenance drought-tolerant landscaping"
    ],
    "lotNumber": "Site #14"
  },
  {
    "id": "list-109",
    "title": "2024 Cavco 4-Bed / 2-Bath Family Double-Wide",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Denton",
    "state": "TX",
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
    "image": "images/listings/home-willowcreek-1.svg",
    "gallery": [
      "images/listings/home-willowcreek-1.svg",
      "images/listings/home-interior-living.svg",
      "images/listings/home-interior-kitchen.svg",
      "images/listings/home-interior-master.svg"
    ],
    "description": "Exceptional brand-new 4-bedroom family home at Willow Creek Village. Generous open floor plan featuring a massive kitchen island, dining room, utility mudroom, master suite with soaking tub, and three comfortable guest bedrooms.",
    "features": [
      "4 spacious bedrooms with large closets",
      "Kitchen island with pendant lighting and full appliance package",
      "Spa-like master bath with garden tub and separate shower",
      "Full concrete double driveway",
      "Front deck and rear steps installed",
      "Minutes from UNT and downtown Denton"
    ],
    "lotNumber": "Site #68"
  },
  {
    "id": "list-110",
    "title": "Modern 3-Bed / 2-Bath Home for Rent",
    "communityId": "willow-creek",
    "communityName": "Willow Creek Village",
    "city": "Denton",
    "state": "TX",
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
    "image": "images/listings/home-rent-willowcreek.svg",
    "gallery": [
      "images/listings/home-rent-willowcreek.svg",
      "images/listings/home-interior-living.svg",
      "images/listings/home-interior-kitchen.svg"
    ],
    "description": "Move-in ready 3-bedroom rental home with central AC, contemporary finishes, all kitchen appliances, and spacious master suite. Located near the community swimming pool and basketball court with easy highway access.",
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
    "city": "Denton",
    "state": "TX",
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
    "image": "images/listings/lot-rv-willowcreek.svg",
    "gallery": [
      "images/listings/lot-rv-willowcreek.svg",
      "images/communities/willow-creek-rv.svg"
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
    "city": "Denton",
    "state": "TX",
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
    "image": "images/listings/lot-willowcreek-77.svg",
    "gallery": [
      "images/listings/lot-willowcreek-77.svg",
      "images/communities/willow-creek-entrance.svg"
    ],
    "description": "Ready-to-build homesite ideal for bringing your own new or modern double-wide manufactured home. High-capacity infrastructure, concrete driveway, and friendly neighbors in Denton's premier family community.",
    "features": [
      "Accommodates up to 28x64 double-wide homes",
      "200-amp underground electrical service",
      "City of Denton municipal water & wastewater",
      "Concrete double driveway pad in place",
      "Curbside trash & recycling included in lot rent"
    ],
    "lotNumber": "Site #77"
  }
];
