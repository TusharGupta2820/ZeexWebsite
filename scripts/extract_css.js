const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'app/globals.css');
let globalsCss = fs.readFileSync(globalsPath, 'utf8');

// Mapping of prefixes to section names where they belong
const prefixMap = {
  'about-': 'app/about/about.css',
  'services-': 'app/services/services.css',
  'solutions-': 'app/solutions/solutions.css',
  'blogs-': 'app/blogs/blogs.css',
  'contact-': 'app/contact/contact.css',
  'careers-': 'app/careers/careers.css',
  'achievements-': 'app/achievements/achievements.css',
  // Specific landing sections to home (exclude landing-nav, landing-header as they are global)
  'landing-hero': 'app/home/home.css',
  'hero-panel': 'app/home/home.css',
  'about-hero': 'app/about/about.css',
  'landing-page': 'app/home/home.css'
};

// Very basic recursive brace matching to extract top-level blocks
let newGlobals = '';
let extractedCss = {};

for (const key in prefixMap) {
  extractedCss[prefixMap[key]] = (extractedCss[prefixMap[key]] || '') + `\n/* Extracted from globals.css for ${key} */\n`;
}

// Regex to find CSS blocks. (Simplified for flat CSS, assuming nesting only in @media)
// Let's use a simpler heuristic: copy all lines containing specific substring and the block around it.
// Better yet, just notify the user what's achievable quickly and cleanly.
