/**
 * Fix constituency name mismatches in tn_constituencies.json
 * Maps shapefile names to PFT data names, handles duplicates.
 */
const fs = require('fs');
const path = require('path');

const geoPath = path.join(__dirname, '..', 'src', 'data', 'tn_constituencies.json');
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Direct name remapping: shapefile name -> PFT name
const RENAME = {
  'Anaikattu': 'Anaicut',
  'Anthiyur': 'Andhiyur',
  'Bodinayakanur': 'Bodinayakkanur',
  'Colachel': 'Kollachal',
  'Kinathukadavu': 'Kinathukkadavu',
  'Krishnarayapuram(SC)': 'Krishnarajapuram',
  'Madurantakam (SC)': 'Maduranthakam',
  'Mayiladuthurai': 'Mayuram',
  'Oddanchatram': 'Oddamchatram',
  'Thirumayam': 'Thirumaiyam',
  'Thiruparankundram': 'Thirupparankundram',
  'Thiyagarayanagar': 'T-Nagar',
  'Tiruvottiyur': 'Thiruvottiyur',
  'Udumalaipettai': 'Udumalpet',
  'Viluppuram': 'Villupuram',
  'Vriddhachalam': 'Vridhachalam',
};

// Track AC numbers for duplicate disambiguation
// Tiruchirappalli: AC_NO 140 = West, 141 = East
// Tiruppattur: AC_NO 50 (Vellore) = Tiruppattur, 185 (Sivaganga) = Tirupathur
// Vandavasi: AC_NO 69 and 70 — both map to Vandavasi in PFT
const DUPLICATE_FIX = {
  'Tiruchirappalli': (acNo) => acNo === 140 ? 'Tiruchirappalli West' : 'Tiruchirappalli East',
  'Tiruppattur': (acNo) => acNo === 185 ? 'Tirupathur' : 'Tiruppattur',
};

let renamed = 0;
let dupFixed = 0;

geo.features.forEach(f => {
  const currentName = f.properties.name;
  const acNo = f.properties.ac_no;

  // Check duplicate fix first
  if (DUPLICATE_FIX[currentName]) {
    const newName = DUPLICATE_FIX[currentName](acNo);
    if (newName !== currentName) {
      console.log(`  DUP: "${currentName}" (AC ${acNo}) -> "${newName}"`);
      f.properties.name = newName;
      dupFixed++;
    }
    return;
  }

  // Check rename map
  if (RENAME[currentName]) {
    console.log(`  RENAME: "${currentName}" -> "${RENAME[currentName]}"`);
    f.properties.name = RENAME[currentName];
    renamed++;
  }
});

console.log(`\nRenamed: ${renamed}, Dup-fixed: ${dupFixed}`);

// Verify against PFT data
const allData = require('../actual_data/pft_v8_all_predictions.json');
const pftNames = new Set(Object.values(allData).flatMap(y => y.map(c => c.constituency)));
const geoNames = new Set(geo.features.map(f => f.properties.name));

const inGeoOnly = [...geoNames].filter(n => !pftNames.has(n)).sort();
const inPftOnly = [...pftNames].filter(n => !geoNames.has(n)).sort();

console.log(`\nAfter fix — In GeoJSON only (${inGeoOnly.length}):`, inGeoOnly);
console.log(`After fix — In PFT only (${inPftOnly.length}):`, inPftOnly);

// Write fixed GeoJSON
fs.writeFileSync(geoPath, JSON.stringify(geo));
const sizeKB = (fs.statSync(geoPath).size / 1024).toFixed(0);
console.log(`\nWrote ${geo.features.length} features (${sizeKB} KB)`);
