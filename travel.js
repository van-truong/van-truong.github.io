/* ═══════════════════════════════════════════════════════════════════
   Traveler page — interactive world map + year-grouped timeline
   Data lives in EVENTS below. Add entries to update both the map and
   the timeline simultaneously.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Location → [lat, lng] lookup ──────────────────────────────────── */
const LOC_COORDS = {
  // 2026
  'Cape Town, South Africa':   [-33.92, 18.42],
  'Sydney, Australia':         [-33.87, 151.21],
  'Barcelona, Spain':          [41.39, 2.17],
  'Washington, D.C.':          [38.91, -77.04],
  'Seoul, South Korea':        [37.57, 126.98],
  'Denver, CO':                [39.74, -104.99],
  // 2025
  'Wuhan, China':              [30.59, 114.31],
  'Germany':                   [51.17, 10.45],
  'St. Louis, MO':             [38.63, -90.20],
  'Philadelphia, PA':          [39.95, -75.17],
  'Arlington, VA':             [38.88, -77.10],
  'Fairfield, VT':             [44.79, -72.94],
  'Houston, TX':               [29.76, -95.37],
  'Liverpool, UK':             [53.41, -2.99],
  // 2024
  'Vancouver, B.C., Canada':   [49.28, -123.12],
  'Lisbon, Portugal':          [38.72, -9.14],
  'San Diego, CA':             [32.72, -117.16],
  'Atlanta, GA':               [33.75, -84.39],
  'Okinawa, Japan':            [26.34, 127.94],
  'Fukushima, Japan':          [37.75, 140.47],
  'Vienna, Austria':           [48.21, 16.37],
  'Osaka, Japan':              [34.69, 135.50],
  // 2023
  'New Orleans, LA':           [29.95, -90.07],
  'Nashville, TN':             [36.16, -86.78],
  'Pittsburgh, PA':            [40.44, -79.99],
  'Pocono Mountains, PA':      [41.10, -75.36],
  'Cambridge, MA':             [42.37, -71.11],
  'Rio Grande, PR':            [18.38, -65.83],
  // 2022
  'Los Angeles, CA':           [34.05, -118.24],
  'Ann Arbor, MI':             [42.28, -83.74],
  'Boston, MA':                [42.36, -71.06],
  'San Francisco, CA':         [37.77, -122.42],
  'Kona, HI':                  [19.64, -155.99],
  // 2019–20
  'Bethesda, MD':              [38.98, -77.10],
  'Columbus, OH':              [39.96, -82.99],
  'New York, NY':              [40.71, -74.01],
  'Gaithersburg, MD':          [39.14, -77.20],
  'Rockville, MD':             [39.08, -77.15],
  'Fairfax, VA':               [38.85, -77.31],
  // 2018
  'Blacksburg, VA':            [37.23, -80.41],
  // 2017
  'Phoenix, AZ':               [33.45, -112.07],
  'St. Augustine, FL':         [29.90, -81.31],
  'Palm Beach, FL':            [26.71, -80.04],
  // 2016
  'Durham, NC':                [35.99, -78.90],
  'Orlando, FL':               [28.54, -81.38],
  // 2015–
  'Gainesville, FL':           [29.65, -82.32],
  // Vietnam fieldwork (2024)
  'Ho Chi Minh City, Vietnam': [10.76, 106.66],
  'Hanoi, Vietnam':            [21.03, 105.85],
  'Da Nang, Vietnam':          [16.06, 108.22],
  'Nha Phong, Vietnam':        [17.55, 106.28],
  'Mui Ne, Vietnam':           [10.93, 108.29],
  'Hue, Vietnam':              [16.46, 107.59],
  // 2014 bike tour & 2012 Hamilton Scholars
  'Seattle, WA':               [47.61, -122.33],
  'Daytona Beach, FL':         [29.21, -81.02],
  // Vacations
  'Brussels, Belgium':         [50.85, 4.35],
  'Bruges, Belgium':           [51.21, 3.22],
  'Antwerp, Belgium':          [51.22, 4.40],
  'Ghent, Belgium':            [51.05, 3.73],
  'Paris, France':             [48.86, 2.35],
  'Berlin, Germany':           [52.52, 13.40],
  'Nosara, Costa Rica':        [9.98, -85.65],
  'San José, Costa Rica':      [9.93, -84.08],
  'Chattanooga, TN':           [35.05, -85.31],
};

function getCoords(loc) {
  if (!loc) return null;
  const norm = loc.trim();
  if (/^virtual$/i.test(norm)) return null;
  const cleaned = norm
    .replace(/^Hybrid\s*\/\s*/i, '')
    .replace(/\s*\/\s*Hybrid$/i, '')
    .trim();
  return LOC_COORDS[cleaned] || LOC_COORDS[norm] || null;
}

/* ── Events ────────────────────────────────────────────────────────── */
const EVENTS = [
  // ── 2026 ─────────────────────────────────────────────────────────
  { year: 2026, month: 'Dec', event: 'NeurIPS 2026', location: 'Sydney, Australia', note: 'NeurIPS 2026 will be held in Sydney 6–12 December 2026.', attended: true, tentative: true },
  { year: 2026, month: 'Oct', event: 'Mozilla Fest', location: 'Barcelona, Spain', note: '', attended: true, tentative: true },
  { year: 2026, month: 'Jul', event: 'ISMB 2026 + BOSC 2026', location: 'Washington, D.C.', note: 'BOSC Organizer + lightning talk!', attended: true, confirmed: true },
  { year: 2026, month: 'Jul', event: 'ICML 2026', location: 'Seoul, South Korea', note: 'AI4GOOD Workshop Organizer!', attended: true, tentative: true },
  { year: 2026, month: 'Jan–May', event: 'Cooperative AI Research Fellowship', location: 'Cape Town, South Africa', note: 'AI residency — 12 fellows selected from 1,100+ applicants.', attended: true },

  // ── 2025 ─────────────────────────────────────────────────────────
  { year: 2025, month: 'Dec', event: 'IEEE BIBM 2025', location: 'Wuhan, China', note: 'Paper accepted to the Workshop on Synergizing Multi-modal Agents and Large Foundation Models.', attended: true },
  { year: 2025, month: 'Oct', event: "US-RSE'25", location: 'Philadelphia, PA', note: 'Paper acceptance and conference talk!', attended: true },
  { year: 2025, month: 'Oct', event: 'AWS Open Data Life Sciences Hackathon', location: 'Arlington, VA', note: 'Accepted to hack at Amazon HQ2!', attended: true },
  { year: 2025, month: 'Aug', event: 'Radical Adventure Riders NE Area Retreat', location: 'Fairfield, VT', note: 'Recipient of the Andrea Gonzalez (AG) FTWNB Memorial Scholarship.', attended: true },
  { year: 2025, month: 'Aug', event: '7th Pan-Structural Variation Hackathon', location: 'Hybrid / Houston, TX', note: "Hackathon participant — couldn't participate fully due to time zones and PhD deadlines.", attended: true },
  { year: 2025, month: 'Mar', event: 'Costa Rica vacation — Nosara', location: 'Nosara, Costa Rica', note: 'Vacation with stops in Nosara and San José.', attended: true },
  { year: 2025, month: 'Mar', event: 'Costa Rica vacation — San José', location: 'San José, Costa Rica', note: '', attended: true },

  // ── 2024 ─────────────────────────────────────────────────────────
  { year: 2024, month: 'Sep', event: 'Vietnam vacation — Mui Ne', location: 'Mui Ne, Vietnam', note: '', attended: true },
  { year: 2024, month: 'Aug', event: 'AIM-AHEAD Annual Meeting — AI for Health Equity Symposium', location: 'Atlanta, GA', note: "Presenting a team-science 'Works In Progress' poster.", attended: true },
  { year: 2024, month: 'Aug', event: 'Vietnam vacation — Nha Phong', location: 'Nha Phong, Vietnam', note: 'Supported by the Penn Global Dissertation Grant.', attended: true },
  { year: 2024, month: 'Aug', event: 'Conducting fieldwork — Da Nang', location: 'Da Nang, Vietnam', note: 'Supported by the Penn Global Dissertation Grant.', attended: true },
  { year: 2024, month: 'Aug', event: 'Conducting fieldwork — Hanoi', location: 'Hanoi, Vietnam', note: '', attended: true },
  { year: 2024, month: 'Aug', event: 'Penn Global Dissertation Grant fieldwork begins', location: 'Ho Chi Minh City, Vietnam', note: 'Three-month fieldwork interviewing Vietnamese perspectives on AI adoption (Penn Global Dissertation Grant).', attended: true },
  { year: 2024, month: 'Aug', event: 'Vietnam vacation — Hue', location: 'Hue, Vietnam', note: 'Side stop during Aug 2024 Vietnam trip (HCMC, Phong Nha, Hue, Hanoi).', attended: true },

  // ── 2023 ─────────────────────────────────────────────────────────
  { year: 2023, month: 'Dec', event: 'NeurIPS 2023 + AI for Science Workshop', location: 'New Orleans, LA', note: 'Paper acceptance and poster presentation.', attended: true },
  { year: 2023, month: 'Dec', event: 'ML4H Symposium @ NeurIPS', location: 'New Orleans, LA', note: 'Organizing Committee duties; hosted by AHLI.', attended: true },
  { year: 2023, month: 'Nov', event: 'SC23 + Workshop on HPC Challenges on Frontier (ORNL)', location: 'Denver, CO', note: 'Accepted the ACM SIGHPC Award onstage. Travel sponsored by ACM and the IEEE Computer Society.', attended: true },
  { year: 2023, month: 'Nov', event: 'International Genetic Epidemiology Society (IGES)', location: 'Nashville, TN', note: 'Poster Presentation.', attended: true },
  { year: 2023, month: 'Nov', event: 'ASHG 2023 — Annual Society for Human Genetics Meeting', location: 'Washington, D.C.', note: 'Poster Presentation.', attended: true },
  { year: 2023, month: 'Oct', event: 'CMU Hackathon — Graph Extraction for Biomedical LLMs', location: 'Hybrid / Pittsburgh, PA', note: 'Declined due to concussion, then jumped in late once feeling better.', attended: true },
  { year: 2023, month: 'Oct', event: 'Pennsylvania Conference for Women', location: 'Philadelphia, PA', note: 'Career development.', attended: true },
  { year: 2023, month: 'Sep', event: 'Wharton Baker Retail Ideathon (Five Below HQ)', location: 'Philadelphia, PA', note: 'Career development.', attended: true },
  { year: 2023, month: 'Sep', event: 'Women In Sports Data Symposium (Phillies MLB)', location: 'Philadelphia, PA', note: 'Career development.', attended: true },
  { year: 2023, month: 'Sep', event: 'Inaugural IBI + GCB Retreat', location: 'Pocono Mountains, PA', note: 'Career development.', attended: true },
  { year: 2023, month: 'Aug', event: 'Pan-Structural Variation Hackathon (Baylor)', location: 'Hybrid / Houston, TX', note: '', attended: true },
  { year: 2023, month: 'Aug', event: 'Nucleate Summit: Alumni Phase 6', location: 'San Diego, CA', note: 'Met up with Bill Heath, Lina Aboulmouna, and other Lilly folks.', attended: true },
  { year: 2023, month: 'Jun–Aug', event: 'Eli Lilly Biotechnology Center Internship', location: 'San Diego, CA', note: 'Interviewed by Dr. Jiye Shi and Dr. Qing Chai; arranged by Dr. Bill Heath.', attended: true },
  { year: 2023, month: 'Jun', event: 'Multiomics in Precision Medicine 2023', location: 'Philadelphia, PA', note: 'Hybrid.', attended: true },
  { year: 2023, month: 'May', event: 'SAIL — Symposium on AI in Learning Health Systems', location: 'Rio Grande, PR', note: 'Career development.', attended: true },
  { year: 2023, month: 'Apr', event: 'GEMINI Workshop — Illustrator + R figures', location: 'Philadelphia, PA', note: 'Led by Allie Greenplate and Mark Painter.', attended: true },
  { year: 2023, month: 'Apr', event: 'GEMINI Workshop — ggplot + R', location: 'Philadelphia, PA', note: 'Led by Matei Ionita.', attended: true },
  { year: 2023, month: 'Mar', event: 'TN/GA road trip — Chattanooga', location: 'Chattanooga, TN', note: 'Road trip vacation: Chattanooga + Atlanta.', attended: true },
  { year: 2023, month: 'Mar', event: 'TN/GA road trip — Atlanta', location: 'Atlanta, GA', note: '', attended: true },
  { year: 2023, month: 'Feb', event: '6-day Stillpond Computational Cytometry Workshop', location: 'Philadelphia, PA', note: 'Led by Wade Rogers, Matei Ionita, and Herb Hoylst.', attended: true },

  // ── 2022 ─────────────────────────────────────────────────────────
  { year: 2022, month: 'Nov', event: 'GEMINI Workshop — Flow Cytometry in R/Bioconductor', location: 'Philadelphia, PA', note: 'Led by Matei Ionita and Wade Rogers.', attended: true },
  { year: 2022, month: 'Oct', event: 'American Society for Human Genetics', location: 'Los Angeles, CA', note: 'Poster Presentation. Met Ben Busby at DNAnexus Happy Hour — mutual interests: rock climbing and biohackathons.', attended: true },
  { year: 2022, month: 'Oct', event: 'GEMINI Workshop — FlowJo', location: 'Philadelphia, PA', note: 'Led by Allie Greenplate and FlowJo reps.', attended: true },
  { year: 2022, month: 'Sep', event: 'International Conference on Biomedical Ontology', location: 'Hybrid / Ann Arbor, MI', note: '', attended: true },
  { year: 2022, month: 'Sep', event: 'GEMINI Workshop — OMIQ', location: 'Philadelphia, PA', note: 'Led by Allie Greenplate.', attended: true },
  { year: 2022, month: 'Aug', event: 'Inaugural Nucleate Summit', location: 'Boston, MA', note: 'Excedr Travel Grant Awardee.', attended: true },
  { year: 2022, month: 'Jun', event: 'Federation of Clinical Immunology Societies (FOCiS)', location: 'San Francisco, CA', note: 'Systems Immunology + Big Data Workshop. Met Oliver He and Elena Hsieh.', attended: true },
  { year: 2022, month: 'Jan', event: 'Pacific Symposium on Biocomputing', location: 'Kona, HI', note: 'Poster Presentation.', attended: true },

  // ── 2021 ─────────────────────────────────────────────────────────
  { year: 2021, month: 'Jul', event: 'Seattle visit', location: 'Seattle, WA', note: 'Vacation.', attended: true },
  { year: 2021, month: 'Feb', event: 'Regulatory Concepts in Drug Development (Penn ITMAT)', location: 'Philadelphia, PA', note: 'Met Narendra Chirmule, who later bike-toured through India and Vietnam.', attended: true },

  // ── 2020 ─────────────────────────────────────────────────────────
  { year: 2020, month: 'Aug', event: 'Penn Immunology Bootcamp', location: 'Philadelphia, PA', note: '', attended: true },
  { year: 2020, month: 'Jun', event: 'NIH Library — Deep Learning Hands-On Lab', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2020, month: 'Jun', event: "Sentiment Analysis on Parkinson's Disease Hackathon", location: 'Bethesda, MD', note: '', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Brussels', location: 'Brussels, Belgium', note: 'Multi-city Europe trip: Brussels, Bruges, Antwerp, Ghent, Paris, Berlin.', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Bruges', location: 'Bruges, Belgium', note: '', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Antwerp', location: 'Antwerp, Belgium', note: '', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Ghent', location: 'Ghent, Belgium', note: '', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Paris', location: 'Paris, France', note: '', attended: true },
  { year: 2020, month: 'Jan', event: 'Europe vacation — Berlin', location: 'Berlin, Germany', note: '', attended: true },

  // ── 2019 ─────────────────────────────────────────────────────────
  { year: 2019, month: 'Aug–Dec', event: 'Basic Principles of Immunology & Hypersensitivity (NIH FAES)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Nov', event: 'Evolutionary Dynamics in Cancer Workshop (OSU MBI)', location: 'Columbus, OH', note: 'Travel Grant Awardee.', attended: true },
  { year: 2019, month: 'Oct', event: 'Curiosity Beyond the Classroom — Informal STEM Learning', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Oct', event: 'NIH.AI Workshop — ML for NGS & Drug Data', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Oct', event: 'Cancer and Inflammation: From Micro to Macro (NCI)', location: 'Bethesda, MD', note: 'Designed the Program Art.', attended: true },
  { year: 2019, month: 'Sep', event: 'Annual Post-Baccalaureate Poster Symposium (NIH)', location: 'Bethesda, MD', note: 'Outstanding Poster Award.', attended: true },
  { year: 2019, month: 'Sep', event: 'Conveying Science Through Art (NYAS + Guerilla Science)', location: 'New York, NY', note: 'Scientist & Artist Participant.', attended: true },
  { year: 2019, month: 'Sep', event: 'Annual Immunology Interest Group Workshop (NIH)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Aug', event: 'Quantitative Sciences Hackathon (Novartis)', location: 'Cambridge, MA', note: '1st Place Team.', attended: true },
  { year: 2019, month: 'Aug', event: 'CivicFest (DC Tutoring & Mentoring Initiative)', location: 'Washington, D.C.', note: 'Art Exhibitor.', attended: true },
  { year: 2019, month: 'Jul', event: 'Machine Intelligence in Healthcare Workshop (NIH)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Jun', event: 'Principles of Clinical Pharmacology (NIH)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'May', event: 'Women-Led Biodata Science Hackathon (NCBI/NIH)', location: 'Bethesda, MD', note: 'Computational immunology project.', attended: true },
  { year: 2019, month: 'Apr', event: 'NIH-AACR Cancer, Autoimmunity, and Immunology Meeting', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Apr', event: 'BioHealth Capital Region Forum (AstraZeneca)', location: 'Gaithersburg, MD', note: '', attended: true },
  { year: 2019, month: 'Apr', event: 'Single Cell RNA-Seq Workshop (NIH)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Feb', event: 'NCI Fellows & Young Investigators Colloquium', location: 'Rockville, MD', note: 'Top-Ranked Abstract — Oral Presentation.', attended: true },
  { year: 2019, month: 'Jan', event: 'Cell-Based Immunotherapy Workshop (NIH)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2019, month: 'Jan', event: 'Youth Bioinformatics Symposium (GMU)', location: 'Fairfax, VA', note: '', attended: true },

  // ── 2018 ─────────────────────────────────────────────────────────
  { year: 2018, month: 'Nov', event: 'Data Science Initiative Workshop (NCI + UMD)', location: 'Bethesda, MD', note: '', attended: true },
  { year: 2018, month: 'Jul', event: 'Pipelines into Biostatistics Symposium (Harvard T.H. Chan)', location: 'Boston, MA', note: 'Oral Presentation.', attended: true },
  { year: 2018, month: 'Jun–Jul', event: 'Intensive Program in Biostatistics + Computational Biology (Harvard T.H. Chan)', location: 'Boston, MA', note: '', attended: true },
  { year: 2018, month: 'May', event: 'Innovation, Creativity, Arts, and Technology Fair (VT Moss Arts Center)', location: 'Blacksburg, VA', note: 'SEAD Grant Recipient.', attended: true },
  { year: 2018, month: 'May', event: 'Initiative for Maximizing Diversity Forum (Virginia Tech)', location: 'Blacksburg, VA', note: 'Oral Presentation.', attended: true },
  { year: 2018, month: 'Feb', event: 'Via Research Recognition Day (Edward Via College of Osteopathic Medicine)', location: 'Blacksburg, VA', note: 'Paper Presentation.', attended: true },

  // ── 2017 ─────────────────────────────────────────────────────────
  { year: 2017, month: 'Nov', event: 'Neurotech Symposium (MIT)', location: 'Cambridge, MA', note: '', attended: true },
  { year: 2017, month: 'Nov', event: 'Outreach Conference — Diversity in Math Modeling + Public Health (Harvard)', location: 'Boston, MA', note: 'Travel Grant Recipient.', attended: true },
  { year: 2017, month: 'Nov', event: 'Annual Biomedical Research Conference for Minority Students', location: 'Phoenix, AZ', note: 'Poster Presentation.', attended: true },
  { year: 2017, month: 'Nov', event: 'Biocomplexity Institute Research Symposium (Virginia Tech)', location: 'Blacksburg, VA', note: 'Faculty Choice Award for Poster Presentation.', attended: true },
  { year: 2017, month: 'Oct', event: 'Innovation4Jobs Summit (Gallup HQ)', location: 'Washington, D.C.', note: 'One of 4 undergraduates invited.', attended: true },
  { year: 2017, month: 'Apr', event: 'TEDxUF Conference', location: 'Gainesville, FL', note: 'Art Exhibitor.', attended: true },
  { year: 2017, month: 'Apr', event: 'UF Undergraduate Research Symposium', location: 'Gainesville, FL', note: 'Poster Presentation.', attended: true },
  { year: 2017, month: 'Mar', event: 'Tapestry Conference — Interactive Data Science Storytelling', location: 'St. Augustine, FL', note: 'Only undergraduate invited to attend.', attended: true },
  { year: 2017, month: 'Feb', event: 'Sunposium — Neural Circuits Research (Max Planck FL Inst.)', location: 'Palm Beach, FL', note: '', attended: true },

  // ── 2016 ─────────────────────────────────────────────────────────
  { year: 2016, month: 'Nov', event: 'HackDuke — Coding for Social Good', location: 'Durham, NC', note: '', attended: true },
  { year: 2016, month: 'Oct', event: 'Pop-Up Culture Celebration (UF, Nat. Arts & Humanities Month)', location: 'Gainesville, FL', note: 'Art Exhibitor and Co-Organizer.', attended: true },
  { year: 2016, month: 'Sep', event: 'NanoFlorida Conference (UCF)', location: 'Orlando, FL', note: 'Honorable Mention for Poster Presentation.', attended: true },
  { year: 2016, month: 'Apr', event: 'UF Undergraduate Research Symposium', location: 'Gainesville, FL', note: 'Poster Presentation.', attended: true },
  { year: 2016, month: 'Jan–Apr', event: 'Lab Experiments in Art + Science Program', location: 'Gainesville, FL', note: 'Art Exhibitor.', attended: true },

  // ── 2015 ─────────────────────────────────────────────────────────
  { year: 2015, month: 'Oct', event: 'Pop-Up Culture Celebration (UF, Nat. Arts & Humanities Month)', location: 'Gainesville, FL', note: 'Art Exhibitor and the only undergraduate invited by the College of Fine Arts Dean to join the organizing committee.', attended: true },
  { year: 2015, month: 'Apr', event: 'DNA Day Celebration (UF Genetics Institute)', location: 'Gainesville, FL', note: 'Art Exhibitor.', attended: true },

  // ── 2014 ─────────────────────────────────────────────────────────
  { year: 2014, month: 'Aug', event: 'Cross-country bike tour — FINISH', location: 'Daytona Beach, FL', note: '89 days, 13 states, ~5,000 miles. Arrived in time for my mom\'s birthday. Fundraised $2k+ for the Alexander Hamilton Scholars Program.', attended: true },
  { year: 2014, month: 'May', event: 'Cross-country bike tour — START', location: 'Seattle, WA', note: 'Beginning of a 5,000-mile solo bike tour to Daytona Beach, FL.', attended: true },

  // ── 2012 ─────────────────────────────────────────────────────────
  { year: 2012, month: 'Jul', event: 'Hamilton Scholars Program Leader Week', location: 'Seattle, WA', note: 'Selected as 1 of 35 Hamilton Scholars from a national pool of high-achieving high school students.', attended: true },
];

/* ── Helpers ───────────────────────────────────────────────────────── */
const MONTH_NUM = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Sept: 9, Oct: 10, Nov: 11, Dec: 12,
};

function monthSort(m) {
  if (!m) return 0;
  const last = String(m).split(/\s*[-–]\s*/).pop().slice(0, 3);
  return MONTH_NUM[last] || 0;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

/* ── Event card ───────────────────────────────────────────────────── */
function renderEventCard(e) {
  const flags = [
    e.tentative && 'tentative',
    e.confirmed && 'confirmed',
    e.attended === false && 'not-attended',
  ].filter(Boolean).join(' ');
  const badge = e.confirmed
    ? '<span class="event-badge badge-confirmed">confirmed</span>'
    : e.tentative
      ? '<span class="event-badge badge-tentative">tentative</span>'
      : '';
  return `
    <div class="travel-event${flags ? ' ' + flags : ''}">
      <div class="travel-event-month">${escapeHtml(e.month)}</div>
      <div class="travel-event-title">${escapeHtml(e.event)}${badge}</div>
      <div class="travel-event-place">${escapeHtml(e.location)}</div>
      ${e.note ? `<div class="travel-event-note">${escapeHtml(e.note)}</div>` : ''}
    </div>`;
}

/* ── Next-stop render (tentative events only) ─────────────────────── */
function renderNextStop() {
  const container = document.getElementById('travel-next-stop');
  if (!container) return;

  const tentative = EVENTS.filter(e => e.tentative).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthSort(a.month) - monthSort(b.month);
  });

  if (tentative.length === 0) {
    container.innerHTML = '<p class="travel-loading">Nothing tentative on the calendar right now.</p>';
    return;
  }

  container.innerHTML = `
    <div class="travel-events">
      ${tentative.map(renderEventCard).join('')}
    </div>
  `;
}

/* ── Timeline render (includes tentative — they also appear in Next stop) ── */
function renderTravelTimeline() {
  const container = document.getElementById('travel-log');
  if (!container) return;

  const sorted = [...EVENTS].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return monthSort(b.month) - monthSort(a.month);
  });

  const byYear = {};
  sorted.forEach(e => { (byYear[e.year] = byYear[e.year] || []).push(e); });
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  const places = new Set();
  EVENTS.forEach(e => {
    if (e.attended !== false && getCoords(e.location)) places.add(e.location);
  });

  container.innerHTML = `
    <div class="travel-stats">
      <span><strong>${EVENTS.length}</strong> events</span>
      <span><strong>${places.size}</strong> places</span>
      <span><strong>${years.length}</strong> years</span>
    </div>
    ${years.map(year => `
      <section class="travel-year">
        <h3 class="travel-year-heading">${year}</h3>
        <div class="travel-events">
          ${byYear[year].map(renderEventCard).join('')}
        </div>
      </section>
    `).join('')}
  `;
}

/* ── Map init (lazy — called when traveler hat is selected) ────────── */
function initTravelMap() {
  const el = document.getElementById('travel-map');
  if (!el || el.dataset.initialized) return;
  if (typeof L === 'undefined') {
    el.innerHTML = '<p style="padding:1rem;text-align:center;color:var(--muted);">Map couldn\'t load. The full timeline is below.</p>';
    return;
  }
  el.dataset.initialized = '1';

  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: false,
    worldCopyJump: true,
  }).setView([30, 0], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors · © CARTO',
    subdomains: 'abcd',
    maxZoom: 18,
  }).addTo(map);

  const dotIcon = L.divIcon({
    className: 'travel-marker',
    html: '<div class="travel-dot"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  // Group attended events by location
  const byLocation = {};
  EVENTS.filter(e => e.attended !== false).forEach(e => {
    const coords = getCoords(e.location);
    if (!coords) return;
    const key = e.location.replace(/^Hybrid\s*\/\s*/i, '').trim();
    if (!byLocation[key]) byLocation[key] = { coords, events: [] };
    byLocation[key].events.push(e);
  });

  Object.entries(byLocation).forEach(([loc, data]) => {
    const sortedEv = [...data.events].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return monthSort(b.month) - monthSort(a.month);
    });
    const html = `
      <strong>${escapeHtml(loc)}</strong>
      <span class="popup-count">${data.events.length} visit${data.events.length > 1 ? 's' : ''}</span>
      <ul class="popup-events">
        ${sortedEv.slice(0, 10).map(e => `
          <li>
            <span class="popup-date">${e.year} ${escapeHtml(e.month)}</span>
            ${escapeHtml(e.event)}
          </li>
        `).join('')}
        ${sortedEv.length > 10 ? `<li class="popup-more">+${sortedEv.length - 10} more</li>` : ''}
      </ul>
    `;
    L.marker(data.coords, { icon: dotIcon }).addTo(map).bindPopup(html, { maxWidth: 320 });
  });

  // Fit bounds to show everything by default
  const allCoords = Object.values(byLocation).map(d => d.coords);
  if (allCoords.length > 1) {
    map.fitBounds(allCoords, { padding: [40, 40], maxZoom: 4 });
  }

  window._travelMap = map;
}

/* ── Wire it up ───────────────────────────────────────────────────── */
renderNextStop();                // cheap — DOM only
renderTravelTimeline();          // cheap — DOM only
window.initTravelMap = initTravelMap;   // called by app.js when hat is selected
