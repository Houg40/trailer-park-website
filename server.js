const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Helmet security headers (configured for Leaflet OSM tiles and fonts)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://unpkg.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https://*.tile.openstreetmap.org", "https://unpkg.com"],
        connectSrc: ["'self'", "https://*.tile.openstreetmap.org"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public
app.use(express.static(path.join(__dirname, 'public')));

// General API rate limiter (150 requests per 15 mins)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', generalLimiter);

// Form submission rate limiter (15 submissions per 15 mins)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Form submission limit reached. Please wait before submitting again.' }
});

// Configure Multer for secure photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const cleanName = `maintenance-${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
    cb(null, cleanName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP image files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: fileFilter
});

// Helper: Sanitize text input
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
}

// Helper: Read JSON database
function readJson(filename) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

// Helper: Append to JSON database
function appendJson(filename, record) {
  const filePath = path.join(dataDir, filename);
  const data = readJson(filename);
  data.push(record);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// --- API ROUTES ---

// GET /api/communities
app.get('/api/communities', (req, res) => {
  const communities = readJson('communities.json');
  res.json({ success: true, data: communities });
});

// GET /api/listings
app.get('/api/listings', (req, res) => {
  const listings = readJson('listings.json');
  const { community, type, maxPrice, bedrooms } = req.query;

  let filtered = [...listings];
  if (community && community !== 'all') {
    filtered = filtered.filter(l => l.communityId === community);
  }
  if (type && type !== 'all') {
    filtered = filtered.filter(l => l.typeCategory === type);
  }
  if (bedrooms && bedrooms !== 'any') {
    const numBeds = parseInt(bedrooms, 10);
    filtered = filtered.filter(l => l.bedrooms && l.bedrooms >= numBeds);
  }
  if (maxPrice && !isNaN(parseInt(maxPrice, 10))) {
    const priceCap = parseInt(maxPrice, 10);
    filtered = filtered.filter(l => l.priceNum && l.priceNum <= priceCap);
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// POST /api/inquiries (Contact / Tour / Community Inquiry)
app.post('/api/inquiries', formLimiter, (req, res) => {
  const { fullName, email, phone, preferredContact, community, interest, message, _hp_company } = req.body;

  // Honeypot spam check
  if (_hp_company && _hp_company.trim().length > 0) {
    return res.json({ success: true, message: 'Inquiry received.' });
  }

  // Required field checks
  if (!fullName || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Full name, email, and phone number are required.' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const record = {
    id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName: sanitize(fullName),
    email: sanitize(email),
    phone: sanitize(phone),
    preferredContact: sanitize(preferredContact) || 'Phone',
    community: sanitize(community) || 'General Inquiry',
    interest: sanitize(interest) || 'General Information',
    message: sanitize(message),
    submittedAt: new Date().toISOString()
  };

  appendJson('inquiries.json', record);
  console.log(`[Inquiry Created] ${record.id} from ${record.fullName} (${record.community})`);

  res.json({
    success: true,
    message: 'Thank you for contacting Evergreen Heritage Communities! Our property manager will be in touch within 1 business day.',
    referenceId: record.id
  });
});

// POST /api/maintenance (Resident Maintenance Request with optional photo)
app.post('/api/maintenance', formLimiter, (req, res) => {
  upload.single('photo')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'Photo size exceeds the 5MB limit. Please choose a smaller image.' });
      }
      return res.status(400).json({ success: false, error: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    const { residentName, community, lotNumber, phone, email, category, urgency, description, preferredContact, _hp_company } = req.body;

    // Honeypot check
    if (_hp_company && _hp_company.trim().length > 0) {
      return res.json({ success: true, message: 'Request received.' });
    }

    if (!residentName || !community || !lotNumber || !phone || !description) {
      return res.status(400).json({ success: false, error: 'Name, community, lot/unit number, phone, and issue description are required.' });
    }

    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;
    const ticketId = `MR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const record = {
      ticketId,
      residentName: sanitize(residentName),
      community: sanitize(community),
      lotNumber: sanitize(lotNumber),
      phone: sanitize(phone),
      email: sanitize(email),
      category: sanitize(category) || 'General',
      urgency: sanitize(urgency) || 'Routine',
      description: sanitize(description),
      preferredContact: sanitize(preferredContact) || 'Phone Call',
      photoUrl: photoPath,
      status: 'Received',
      submittedAt: new Date().toISOString()
    };

    appendJson('maintenance-requests.json', record);
    console.log(`[Maintenance Request] ${record.ticketId} - ${record.community} Lot ${record.lotNumber} (${record.urgency})`);

    res.json({
      success: true,
      message: `Your maintenance request has been submitted successfully. Your reference number is ${record.ticketId}.`,
      ticketId: record.ticketId
    });
  });
});

// POST /api/waitlist (Join Waiting List)
app.post('/api/waitlist', formLimiter, (req, res) => {
  const { fullName, email, phone, community, desiredType, moveInTimeline, notes, _hp_company } = req.body;

  if (_hp_company && _hp_company.trim().length > 0) {
    return res.json({ success: true, message: 'Added to waitlist.' });
  }

  if (!fullName || !email || !phone) {
    return res.status(400).json({ success: false, error: 'Full name, email, and phone number are required.' });
  }

  const record = {
    id: `WL-${Date.now()}`,
    fullName: sanitize(fullName),
    email: sanitize(email),
    phone: sanitize(phone),
    community: sanitize(community) || 'Any Community',
    desiredType: sanitize(desiredType) || 'Any Housing Type',
    moveInTimeline: sanitize(moveInTimeline) || 'Flexible',
    notes: sanitize(notes),
    submittedAt: new Date().toISOString()
  };

  appendJson('waitlist.json', record);
  console.log(`[Waitlist Entry] ${record.fullName} for ${record.community}`);

  res.json({
    success: true,
    message: "You're on the list! We will notify you as soon as a matching home or lot becomes available.",
    referenceId: record.id
  });
});

// Handle 404 for unknown pages
app.use((req, res) => {
  const notFoundPath = path.join(__dirname, 'public', '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.status(404).sendFile(notFoundPath);
  } else {
    res.status(404).send('404 - Page Not Found');
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Evergreen Heritage Communities Website Running! `);
  console.log(` URL: http://localhost:${PORT}                     `);
  console.log(`===================================================`);
});
