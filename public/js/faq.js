/**
 * FAQ.js - Categorized Accordion & Real-Time Search
 * Evergreen Heritage Communities
 */

const FAQ_DATA = [
  // 1. Applying
  {
    category: 'applying',
    q: 'How do I apply to live in an Evergreen Heritage community?',
    a: 'You can apply by visiting the on-site management office or requesting an application package online. We require a completed application for each adult (18+) occupant, government-issued photo ID, proof of income (such as recent paystubs or benefits statements), and a $35 screening fee per applicant.'
  },
  {
    category: 'applying',
    q: 'What are your resident qualification guidelines?',
    a: 'We evaluate three primary factors: 1) Verifiable gross household income of at least 2.5 to 3 times the monthly lot rent or home rental rate; 2) Positive housing history with no open evictions; and 3) A standard criminal background screening. We take pride in maintaining safe, peaceful communities for all families.'
  },
  {
    category: 'applying',
    q: 'How long does application review take?',
    a: 'Most applications are processed within 24 to 48 business hours once all supporting documentation and verification contacts have been received.'
  },

  // 2. Availability
  {
    category: 'availability',
    q: 'How often is availability updated on the website?',
    a: 'Our inventory of available lots, manufactured homes for sale, and rental homes is updated daily by our on-site property managers. If you see a listing marked "Available Now," you can schedule a tour right away.'
  },
  {
    category: 'availability',
    q: 'Can I reserve a home or lot before it becomes available?',
    a: 'Yes. You may place an approved application and a refundable holding deposit to secure your choice of upcoming homesite while you coordinate home purchase, transport, or relocation.'
  },
  {
    category: 'availability',
    q: 'How does the Priority Waiting List work?',
    a: 'If your preferred community has no immediate openings, you can join our free Priority Waiting List. When a lot or home becomes available, our manager contacts waitlisted applicants in order before public advertising.'
  },

  // 3. Rent & Fees
  {
    category: 'rent-fees',
    q: 'What is included in the monthly lot rent?',
    a: 'Monthly lot rent includes your private homesite lease, weekly curbside trash and recycling pickup, maintenance of common grounds, road upkeep, storm drainage, street lighting, and on-site professional community management.'
  },
  {
    category: 'rent-fees',
    q: 'Are there hidden or surprise fees?',
    a: 'No. As a family-owned business, we believe in transparent, honest pricing. Your lot lease agreement clearly outlines your base rent, any sub-metered utility pass-throughs, and standard fees (such as late payment fees if applicable). There are no administrative surprises.'
  },
  {
    category: 'rent-fees',
    q: 'How frequently does lot rent increase?',
    a: 'Lot rent adjustments are evaluated annually to keep pace with municipal property taxes and infrastructure maintenance costs. When adjustments occur, residents receive a minimum of 60 days advance written notice, and increases are kept fair and responsible.'
  },

  // 4. Pets
  {
    category: 'pets',
    q: 'Are pets allowed in your communities?',
    a: 'Yes! All four of our communities are pet-friendly. We permit up to two domestic pets per household. Dogs must be non-aggressive breeds and generally under 40 lbs (or approved by management depending on the specific community). Indoor cats are welcome.'
  },
  {
    category: 'pets',
    q: 'What are the rules regarding pets in common areas?',
    a: 'Dogs must always be kept on a physical leash when outside your home or private yard, unless within designated fenced dog parks (such as Oak Ridge and Willow Creek). Residents must promptly clean up after their pets using the courtesy pet stations provided.'
  },

  // 5. Utilities
  {
    category: 'utilities',
    q: 'How are water and sewer billed?',
    a: 'In communities with municipal water/sewer, each homesite is individually sub-metered so you only pay for what your household actually uses. Sub-metered readings are billed directly on your monthly resident statement.'
  },
  {
    category: 'utilities',
    q: 'Which internet and cable providers serve your properties?',
    a: 'Depending on the community, high-speed fiber or cable internet is provided by companies including AT&T Fiber, Spectrum, and Frontier. In our East Texas Pine Valley community, high-speed fixed wireless and satellite broadband are commonly used.'
  },
  {
    category: 'utilities',
    q: 'Who do I call to turn on electricity?',
    a: 'In Texas, residents select their preferred Retail Electric Provider (REP). Simply provide your lot number and street address to your chosen electric company (e.g., TXU, Reliant, Green Mountain) 3 to 5 business days before your move-in date.'
  },

  // 6. Community Rules
  {
    category: 'rules',
    q: 'What are the quiet hours across your communities?',
    a: 'Quiet hours are observed daily from 10:00 PM to 7:00 AM (9:00 PM to 8:00 AM in our quiet-focused Cedar Grove community). We enforce quiet hours strictly to ensure working families and retirees get peaceful rest.'
  },
  {
    category: 'rules',
    q: 'What are the rules regarding vehicle parking?',
    a: 'Each home has private off-street parking for up to two passenger vehicles. To keep roadways safe and clear for emergency fire trucks and school buses, overnight street parking and parking on lawns are strictly prohibited.'
  },
  {
    category: 'rules',
    q: 'Can I build a deck, carport, or storage shed?',
    a: 'Yes, with simple management architectural approval. Storage sheds up to 10x12 ft and matching carports are encouraged to keep properties tidy. Plans are reviewed quickly by on-site management at no charge.'
  },

  // 7. Maintenance
  {
    category: 'maintenance',
    q: 'How do I submit a maintenance request?',
    a: 'Existing residents can submit non-emergency maintenance requests anytime through our online Maintenance Portal on this website, or by calling their local management office during business hours.'
  },
  {
    category: 'maintenance',
    q: 'What should I do in a maintenance emergency after hours?',
    a: 'For life-threatening emergencies (smell of gas, sparks, fire), always dial 911 first. For urgent property emergencies (such as a ruptured community water line or sewer blockage), call your community’s 24/7 on-call manager emergency line.'
  },
  {
    category: 'maintenance',
    q: 'Who is responsible for home repairs vs community grounds?',
    a: 'For resident-owned homes, the resident is responsible for the home itself and lot mowing. Community staff is responsible for maintaining all roads, water mains, sewer infrastructure up to the lot connection, community buildings, streetlights, and common grounds.'
  },

  // 8. Payments
  {
    category: 'payments',
    q: 'How can I pay rent each month?',
    a: 'We offer multiple easy payment options: 1) Online resident portal via ACH bank debit or debit/credit card; 2) Automated recurring ACH withdrawal; 3) Personal check, cashier’s check, or money order dropped at the office lockbox. We do not accept cash for security reasons.'
  },
  {
    category: 'payments',
    q: 'When is rent due and is there a grace period?',
    a: 'Rent is due on the 1st of every calendar month. We provide a grace period through 11:59 PM on the 5th of the month. Payments received after the 5th incur a standard late fee as stated in your lease agreement.'
  },

  // 9. Moving In
  {
    category: 'moving',
    q: 'Can I bring my own manufactured home to an available lot?',
    a: 'Yes! We love welcoming new homeowners. Homes must be HUD-code manufactured homes built in 2010 or newer (or in exceptional refurbished condition), with vinyl siding, shingle roofs, and approved skirting. Our manager coordinates site hookups with your certified home installer.'
  },
  {
    category: 'moving',
    q: 'What is required prior to my move-in date?',
    a: 'Before key handover, you must have an approved application, signed lease agreement, paid security deposit and first month’s rent, confirmed utility transfer, and proof of homeowners/renters insurance.'
  },

  // 10. Moving Out
  {
    category: 'moving-out',
    q: 'What is the required notice if I plan to move?',
    a: 'A minimum of 30 days written notice is required prior to the end of your lease term. Please notify management in writing using our standard Notice to Vacate form.'
  },
  {
    category: 'moving-out',
    q: 'Can I sell my home on-site to another buyer?',
    a: 'Yes! If you own your home, you may sell it on-site. However, the prospective buyer must complete an application and be approved by management prior to closing and occupancy.'
  },

  // 11. Management
  {
    category: 'management',
    q: 'Are your managers on-site or off-site third-party contractors?',
    a: 'All our communities are managed by dedicated, friendly on-site managers and maintenance professionals who work directly for the Miller family. We do not outsource to distant third-party call centers.'
  },
  {
    category: 'management',
    q: 'How long has the company been in business?',
    a: 'Evergreen Heritage Communities was founded in 1989 by Robert and Martha Miller. Today, the second and third generations continue the same hands-on, community-first values that built our reputation over 35+ years.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const faqList = document.getElementById('faq-main-list');
  if (!faqList) return;

  const searchInput = document.getElementById('faq-search-input');
  const countEl = document.getElementById('faq-count-badge');
  const catPills = document.querySelectorAll('.filter-pill[data-category]');

  let activeCategory = 'all';

  function renderFaqs() {
    let filtered = [...FAQ_DATA];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(f => f.category === activeCategory);
    }

    if (searchInput && searchInput.value.trim() !== '') {
      const q = searchInput.value.toLowerCase().trim();
      filtered = filtered.filter(f => 
        f.q.toLowerCase().includes(q) || 
        f.a.toLowerCase().includes(q)
      );
    }

    if (countEl) {
      countEl.textContent = `${filtered.length} Questions`;
    }

    if (filtered.length === 0) {
      faqList.innerHTML = `
        <div style="text-align: center; padding: 40px; background: #fff; border-radius: 8px; border: 1px solid var(--color-border);">
          <h4 style="margin-bottom: 8px;">No matching questions found</h4>
          <p style="color: var(--color-charcoal-muted); margin-bottom: 16px;">Have a question that isn't answered here? Contact our team directly.</p>
          <a href="contact.html" class="btn btn-primary">Contact Management</a>
        </div>
      `;
      return;
    }

    faqList.innerHTML = filtered.map((f, i) => `
      <details class="faq-item" name="faq-group">
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

  if (searchInput) {
    searchInput.addEventListener('input', renderFaqs);
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderFaqs();
    });
  });

  renderFaqs();
});
