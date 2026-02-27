/**
 * Extract Tamil Nadu Assembly Constituency boundaries from India shapefile.
 * Converts to GeoJSON, filters TN only, simplifies for web, and
 * matches constituency names to the PFT prediction data.
 */
const shapefile = require('shapefile');
const fs = require('fs');
const path = require('path');

// Load our prediction data to get canonical constituency names
const allPredictions = require('../actual_data/pft_v8_all_predictions.json');
const pftNames = new Set();
Object.values(allPredictions).forEach(yearData => {
  yearData.forEach(c => pftNames.add(c.constituency));
});
const pftNamesList = [...pftNames].sort();
console.log(`PFT data has ${pftNamesList.length} unique constituency names`);

async function main() {
  const shpPath = path.join(__dirname, 'shp', 'India_AC.shp');
  const dbfPath = path.join(__dirname, 'shp', 'India_AC.dbf');

  const source = await shapefile.open(shpPath, dbfPath);
  const allFeatures = [];

  // Read all features
  while (true) {
    const result = await source.read();
    if (result.done) break;
    allFeatures.push(result.value);
  }

  console.log(`Total features in India shapefile: ${allFeatures.length}`);

  // Check what properties exist
  if (allFeatures.length > 0) {
    console.log('Sample properties:', JSON.stringify(allFeatures[0].properties));
  }

  // Find Tamil Nadu features - look for ST_NAME containing Tamil Nadu
  const tnFeatures = allFeatures.filter(f => {
    const props = f.properties;
    const state = (props.ST_NAME || props.State_Name || props.state_name || props.STATE || '').toString();
    return state.toLowerCase().includes('tamil') || state.toLowerCase().includes('tn');
  });

  console.log(`Tamil Nadu features found: ${tnFeatures.length}`);

  if (tnFeatures.length > 0) {
    console.log('TN sample properties:', JSON.stringify(tnFeatures[0].properties));
  }

  // If we can't find TN by state name, list unique state names
  if (tnFeatures.length === 0) {
    const stateNames = new Set();
    allFeatures.forEach(f => {
      Object.entries(f.properties).forEach(([key, val]) => {
        if (key.toLowerCase().includes('state') || key.toLowerCase().includes('st_')) {
          stateNames.add(`${key}=${val}`);
        }
      });
    });
    console.log('Available state fields:', [...stateNames].slice(0, 30));

    // Try all property keys to find state-like field
    const propKeys = Object.keys(allFeatures[0].properties);
    console.log('All property keys:', propKeys);
    
    // Try each key to find one that has 'Tamil Nadu' or similar
    for (const key of propKeys) {
      const vals = new Set(allFeatures.map(f => f.properties[key]));
      const tnLike = [...vals].filter(v => v && v.toString().toLowerCase().includes('tamil'));
      if (tnLike.length > 0) {
        console.log(`Found 'tamil' in key '${key}':`, tnLike);
      }
    }
  }

  if (tnFeatures.length === 0) {
    // List all unique values for each string property
    const propKeys = Object.keys(allFeatures[0].properties);
    for (const key of propKeys) {
      const vals = new Set(allFeatures.map(f => String(f.properties[key] || '')));
      if (vals.size < 50) {
        console.log(`Values for '${key}' (${vals.size}):`, [...vals].sort().join(', '));
      } else {
        console.log(`Values for '${key}': ${vals.size} unique values`);
      }
    }
    return;
  }

  // Get constituency names from shapefile
  const shpNameKey = Object.keys(tnFeatures[0].properties).find(k =>
    k.toLowerCase().includes('ac_name') || k.toLowerCase().includes('constituency') || k.toLowerCase().includes('ac_na')
  ) || 'AC_NAME';

  console.log(`Using name key: ${shpNameKey}`);

  const shpNames = tnFeatures.map(f => f.properties[shpNameKey]).sort();
  console.log(`\nShapefile TN constituency names (${shpNames.length}):`);
  console.log(shpNames.join(', '));

  // Manual overrides for names that don't match automatically
  const MANUAL_MAP = {
    'Tiruvottiyur': 'Thiruvottiyur',
    'Thiyagarayanagar': 'T-Nagar',
    'Anaikattu': 'Anaicut',
    'Madurantakam (SC)': 'Maduranthakam',
    'Anthiyur': 'Andhiyur',
    'Viluppuram': 'Villupuram',
    'Vriddhachalam': 'Vridhachalam',
    'Mayiladuthurai': 'Mayuram',
    'Kinathukadavu': 'Kinathukkadavu',
    'Krishnarayapuram(SC)': 'Krishnarajapuram',
    'Udumalaipettai': 'Udumalpet',
    'Oddanchatram': 'Oddamchatram',
    'Thirumayam': 'Thirumaiyam',
    'Bodinayakanur': 'Bodinayakkanur',
    'Thiruparankundram': 'Thirupparankundram',
    'Colachel': 'Kollachal',
    // Additional spelling differences
    'Chepauk-Thiruvalliken': 'Chepauk',
    'Dr.Radhakrishnan Naga': 'Dr. Radhakrishnan Nagar',
    'Coimbatore(North)': 'Coimbatore North',
    'Coimbatore(South)': 'Coimbatore South',
    'Erode (East)': 'Erode East',
    'Erode (West)': 'Erode West',
    'Salem (North)': 'Salem North',
    'Salem (South)': 'Salem South',
    'Salem (West)': 'Salem West',
    'Tiruppur (North)': 'Tiruppur North',
    'Tiruppur (South)': 'Tiruppur South',
    'Attur(SC)': 'Attur',
    'Kilvaithinankuppam(SC': 'Kilvaithinankuppam',
    'Ulundurpettai': 'Ulundurpet',
    'Yercaud (ST)': 'Yercaud',
  };

  // Build name matching
  const normalize = s => s.toLowerCase().replace(/[^a-z]/g, '');

  const nameMap = {};
  let matched = 0, unmatched = 0;

  for (const feature of tnFeatures) {
    const shpName = feature.properties[shpNameKey];

    // Check manual map first
    if (MANUAL_MAP[shpName]) {
      nameMap[shpName] = MANUAL_MAP[shpName];
      matched++;
      continue;
    }

    const shpNorm = normalize(shpName);

    // Try exact normalized match
    let pftMatch = pftNamesList.find(n => normalize(n) === shpNorm);

    // Try prefix match
    if (!pftMatch) {
      pftMatch = pftNamesList.find(n => normalize(n).startsWith(shpNorm) || shpNorm.startsWith(normalize(n)));
    }

    // Try fuzzy (contains)
    if (!pftMatch) {
      pftMatch = pftNamesList.find(n => normalize(n).includes(shpNorm) || shpNorm.includes(normalize(n)));
    }

    if (pftMatch) {
      nameMap[shpName] = pftMatch;
      matched++;
    } else {
      nameMap[shpName] = shpName; // keep original
      unmatched++;
    }
  }

  console.log(`\nName matching: ${matched} matched, ${unmatched} unmatched`);

  if (unmatched > 0) {
    const unmatchedNames = Object.entries(nameMap).filter(([k, v]) => {
      return !pftNames.has(v);
    }).map(([k]) => k);
    console.log('Unmatched shapefile names:', unmatchedNames);
    console.log('\nPFT names for manual matching:');
    unmatchedNames.forEach(un => {
      const candidates = pftNamesList.filter(p => {
        const a = normalize(un), b = normalize(p);
        return a.slice(0, 4) === b.slice(0, 4);
      });
      console.log(`  ${un} => candidates:`, candidates);
    });
  }

  // Simplify geometry slightly for web performance
  function simplifyCoords(coords) {
    // For web, keep as-is - the shapefile data isn't too heavy for 234 features
    return coords;
  }

  // Build final GeoJSON
  const geoJson = {
    type: 'FeatureCollection',
    features: tnFeatures.map(f => ({
      type: 'Feature',
      properties: {
        name: nameMap[f.properties[shpNameKey]] || f.properties[shpNameKey],
        shp_name: f.properties[shpNameKey],
        ac_no: f.properties.AC_NO || f.properties.ac_no || null,
      },
      geometry: f.geometry,
    }))
  };

  const outPath = path.join(__dirname, '..', 'src', 'data', 'tn_constituencies.json');
  fs.writeFileSync(outPath, JSON.stringify(geoJson));

  const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`\nWrote ${geoJson.features.length} features to ${outPath} (${sizeKB} KB)`);

  // Verify coordinate ranges
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  let totalCoords = 0;
  geoJson.features.forEach(f => {
    const processCoords = (coords) => {
      if (typeof coords[0] === 'number') {
        minLon = Math.min(minLon, coords[0]); maxLon = Math.max(maxLon, coords[0]);
        minLat = Math.min(minLat, coords[1]); maxLat = Math.max(maxLat, coords[1]);
        totalCoords++;
      } else {
        coords.forEach(processCoords);
      }
    };
    processCoords(f.geometry.coordinates);
  });
  console.log(`Coordinate ranges: lon ${minLon.toFixed(2)}-${maxLon.toFixed(2)}, lat ${minLat.toFixed(2)}-${maxLat.toFixed(2)}`);
  console.log(`Total coordinate points: ${totalCoords}`);
}

main().catch(console.error);
