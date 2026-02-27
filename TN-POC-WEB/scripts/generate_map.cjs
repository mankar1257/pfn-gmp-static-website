/**/**

 * Generates a GeoJSON file with polygon features for all 234 TN constituencies. * Tamil Nadu Assembly Constituency Geographic Data Generator

 * Uses Voronoi tessellation from centroid points. * 

 */ * This generates a GeoJSON with Voronoi-tessellated polygons for all 234 

const fs = require('fs'); * TN assembly constituencies, positioned at their approximate real-world 

 * geographic centroids. This creates a proper map that looks like Tamil Nadu.

const COORDS = { */

  "Alandur": [13.003, 80.206], "Alangudi": [10.363, 78.983], "Alangulam": [8.866, 77.497],

  "Ambasamudram": [8.707, 77.460], "Ambattur": [13.114, 80.162], "Ambur": [12.790, 78.718],const fs = require('fs');

  "Anaicut": [12.636, 78.731], "Andhiyur": [11.593, 77.618], "Andipatti": [10.017, 77.612],

  "Anna Nagar": [13.085, 80.210], "Arakkonam": [13.084, 79.671], "Arani": [12.669, 79.281],// Approximate centroid coordinates (lat, lng) for all 234 TN constituencies

  "Aranthangi": [10.170, 79.205], "Aravakurichi": [10.706, 78.155], "Arcot": [12.905, 79.316],// Organized by district/region for geographic accuracy

  "Ariyalur": [11.140, 79.076], "Aruppukkottai": [9.513, 78.098], "Athoor": [9.747, 77.861],const CONSTITUENCY_COORDS = {

  "Attur": [11.597, 78.600], "Avadi": [13.116, 80.097], "Avanashi": [11.266, 77.280],  // Chennai & suburbs (13.0-13.2°N, 80.2-80.3°E)

  "Bargur": [12.296, 78.387], "Bhavani": [11.443, 77.683], "Bhavanisagar": [11.456, 77.082],  "Alandur": [13.003, 80.206],

  "Bhuvanagiri": [11.448, 79.645], "Bodinayakkanur": [10.010, 77.348],  "Ambattur": [13.114, 80.162],

  "Chengalpattu": [12.693, 79.976], "Chengam": [12.310, 78.793], "Chepauk": [13.063, 80.277],  "Anna Nagar": [13.085, 80.210],

  "Cheyyar": [12.661, 79.544], "Cheyyur": [12.352, 80.003], "Chidambaram": [11.399, 79.693],  "Avadi": [13.116, 80.097],

  "Coimbatore North": [11.020, 76.974], "Coimbatore South": [10.983, 76.960],  "Chepauk": [13.063, 80.277],

  "Coonoor": [11.356, 76.795], "Cuddalore": [11.747, 79.770], "Cumbum": [9.738, 77.282],  "Colathur": [13.12, 80.22], // Mapped as Kolathur

  "Dharapuram": [10.736, 77.522], "Dharmapuri": [12.126, 78.157], "Dindigul": [10.366, 77.968],  "Dr. Radhakrishnan Nagar": [13.118, 80.260],

  "Dr. Radhakrishnan Nagar": [13.118, 80.260], "Edappadi": [11.534, 77.804],  "Egmore": [13.073, 80.257],

  "Egmore": [13.073, 80.257], "Erode East": [11.340, 77.740], "Erode West": [11.335, 77.680],  "Harbour": [13.095, 80.295],

  "Gandharvakottai": [10.569, 78.845], "Gangavalli": [11.497, 78.650],  "Kolathur": [13.125, 80.225],

  "Gingee": [12.251, 79.423], "Gobichettipalayam": [11.453, 77.434],  "Madavaram": [13.147, 80.232],

  "Gudalur": [11.505, 76.497], "Gudiyattam": [12.945, 78.872],  "Maduravoyal": [13.063, 80.170],

  "Gummidipoondi": [13.398, 80.117], "Harbour": [13.095, 80.295],  "Mylapore": [13.035, 80.267],

  "Harur": [12.044, 78.484], "Hosur": [12.735, 77.832],  "Perambur": [13.110, 80.250],

  "Jayankondam": [11.069, 79.335], "Jolarpet": [12.565, 78.573],  "Royapuram": [13.115, 80.290],

  "Kadayanallur": [9.072, 77.340], "Kalasapakkam": [12.466, 79.207],  "Saidapet": [13.022, 80.225],

  "Kallakurichi": [11.740, 78.960], "Kancheepuram": [12.834, 79.710],  "Shozhinganallur": [12.905, 80.228],

  "Kangayam": [11.004, 77.561], "Kanniyakumari": [8.089, 77.539],  "T-Nagar": [13.040, 80.233],

  "Karaikudi": [10.072, 78.776], "Karur": [10.957, 78.080],  "Tambaram": [12.924, 80.118],

  "Katpadi": [12.975, 79.163], "Kattumannarkoil": [11.283, 79.620],  "Thousand Lights": [13.058, 80.258],

  "Kavundampalayam": [11.045, 76.945], "Killiyoor": [8.283, 77.323],  "Thiru-Vi-Ka-Nagar": [13.145, 80.255],

  "Kilpennathur": [12.345, 79.045], "Kilvaithinankuppam": [11.740, 79.680],  "Thiruvottiyur": [13.163, 80.300],

  "Kilvelur": [10.676, 79.742], "Kinathukkadavu": [10.850, 77.010],  "Velachery": [12.975, 80.220],

  "Kolathur": [13.125, 80.225], "Kollachal": [8.173, 77.261],  "Villivakkam": [13.107, 80.205],

  "Kovilpatti": [9.171, 77.870], "Krishnagiri": [12.526, 78.214],  "Virugampakkam": [13.048, 80.192],

  "Krishnarajapuram": [13.076, 80.305], "Kulithalai": [10.933, 78.418],  "Pallavaram": [12.967, 80.150],

  "Kumarapalayam": [11.453, 77.692], "Kumbakonam": [10.962, 79.393],  "Poonamallee": [13.047, 80.095],

  "Kunnam": [11.297, 79.215], "Kurinjipadi": [11.589, 79.614],  "Krishnarajapuram": [13.076, 80.305],

  "Lalgudi": [10.873, 78.818], "Madathukulam": [10.557, 77.356],

  "Madavaram": [13.147, 80.232], "Madurai Central": [9.920, 78.120],  // Kancheepuram / Chengalpattu

  "Madurai East": [9.932, 78.145], "Madurai North": [9.945, 78.107],  "Chengalpattu": [12.693, 79.976],

  "Madurai South": [9.893, 78.097], "Madurai West": [9.920, 78.075],  "Cheyyur": [12.352, 80.003],

  "Maduranthakam": [12.468, 79.887], "Maduravoyal": [13.063, 80.170],  "Kancheepuram": [12.834, 79.710],

  "Mailam": [12.041, 79.548], "Manachanallur": [10.966, 78.850],  "Maduranthakam": [12.468, 79.887],

  "Manamadurai": [9.808, 78.473], "Manapparai": [10.610, 78.425],  "Sriperumbudur": [12.971, 79.945],

  "Mannargudi": [10.668, 79.451], "Mayuram": [11.103, 79.655],  "Thiruporur": [12.726, 80.181],

  "Melur": [10.032, 78.337], "Mettuppalayam": [11.298, 76.942],  "Uthiramerur": [12.607, 79.754],

  "Mettur": [11.787, 77.801], "Modakkurichi": [11.215, 77.520],

  "Mudhukulathur": [9.335, 78.864], "Musiri": [10.953, 78.445],  // Tiruvallur

  "Mylapore": [13.035, 80.267], "Nagapattinam": [10.765, 79.842],  "Gummidipoondi": [13.398, 80.117],

  "Nagercoil": [8.179, 77.427], "Namakkal": [11.219, 78.167],  "Ponneri": [13.337, 80.193],

  "Nanguneri": [8.498, 77.647], "Nannilam": [10.880, 79.610],  "Tiruttani": [13.177, 79.637],

  "Natham": [10.225, 78.200], "Neyveli": [11.537, 79.497],  "Thiruvallur": [13.143, 79.914],

  "Nilakkottai": [10.167, 77.854], "Oddamchatram": [10.270, 77.683],

  "Omalur": [11.745, 78.094], "Orathanadu": [10.625, 79.215],  // Vellore / Ranipet / Tirupattur

  "Ottapidaram": [8.988, 78.050], "Padmanabhapuram": [8.236, 77.334],  "Ambur": [12.790, 78.718],

  "Palacodu": [12.243, 78.074], "Palani": [10.451, 77.521],  "Anaicut": [12.636, 78.731],

  "Palayamkottai": [8.722, 77.729], "Palladam": [10.992, 77.282],  "Arcot": [12.905, 79.316],

  "Pallavaram": [12.967, 80.150], "Panruti": [11.773, 79.570],  "Arani": [12.669, 79.281],

  "Papanasam": [10.925, 79.275], "Pappireddippatti": [11.920, 78.368],  "Gudiyattam": [12.945, 78.872],

  "Paramakudi": [9.544, 78.591], "Paramathi-Velur": [11.103, 78.010],  "Jolarpet": [12.565, 78.573],

  "Pattukkottai": [10.427, 79.319], "Pennagaram": [12.133, 77.896],  "Katpadi": [12.975, 79.163],

  "Perambalur": [11.233, 78.873], "Perambur": [13.110, 80.250],  "Ranipet": [12.937, 79.343],

  "Peravurani": [10.290, 79.199], "Periyakulam": [10.117, 77.545],  "Sholingur": [12.784, 79.422],

  "Perundurai": [11.275, 77.588], "Pollachi": [10.659, 77.004],  "Vaniyambadi": [12.682, 78.622],

  "Polur": [12.515, 79.115], "Ponneri": [13.337, 80.193],  "Vellore": [12.922, 79.137],

  "Poompuhar": [11.217, 79.810], "Poonamallee": [13.047, 80.095],  "Veppanahalli": [12.605, 78.630],

  "Pudukkottai": [10.381, 78.821], "Radhapuram": [8.237, 77.735],

  "Rajapalayam": [9.452, 77.556], "Ramanathapuram": [9.365, 78.834],  // Tiruvannamalai

  "Ranipet": [12.937, 79.343], "Rasipuram": [11.462, 78.185],  "Arakkonam": [13.084, 79.671],

  "Rishivandiyam": [11.834, 79.094], "Royapuram": [13.115, 80.290],  "Chengam": [12.310, 78.793],

  "Saidapet": [13.022, 80.225], "Salem North": [11.680, 78.145],  "Cheyyar": [12.661, 79.544],

  "Salem South": [11.640, 78.150], "Salem West": [11.658, 78.080],  "Kalasapakkam": [12.466, 79.207],

  "Sankarankovil": [9.169, 77.531], "Sankarapuram": [11.877, 78.882],  "Kilpennathur": [12.345, 79.045],

  "Sankari": [11.487, 77.870], "Sattur": [9.360, 77.920],  "Polur": [12.515, 79.115],

  "Senthamangalam": [11.800, 78.255], "Sholavandan": [10.013, 78.006],  "Tiruvannamalai": [12.228, 79.072],

  "Sholingur": [12.784, 79.422], "Shozhinganallur": [12.905, 80.228],  "Vandavasi": [12.503, 79.594],

  "Singanallur": [10.998, 77.032], "Sirkazhi": [11.240, 79.735],

  "Sivaganga": [10.034, 78.486], "Sivakasi": [9.449, 77.810],  // Krishnagiri / Dharmapuri

  "Sriperumbudur": [12.971, 79.945], "Srirangam": [10.855, 78.693],  "Bargur": [12.296, 78.387],

  "Srivaikuntam": [8.631, 77.915], "Srivilliputhur": [9.513, 77.633],  "Dharmapuri": [12.126, 78.157],

  "Sulur": [11.036, 77.126], "T-Nagar": [13.040, 80.233],  "Harur": [12.044, 78.484],

  "Tambaram": [12.924, 80.118], "Tenkasi": [8.960, 77.316],  "Hosur": [12.735, 77.832],

  "Thalli": [12.361, 77.862], "Thanjavur": [10.787, 79.138],  "Krishnagiri": [12.526, 78.214],

  "Thiru-Vi-Ka-Nagar": [13.145, 80.255], "Thirumangalam": [9.818, 77.983],  "Palacodu": [12.243, 78.074],

  "Thirumaiyam": [10.494, 78.756], "Thiruporur": [12.726, 80.181],  "Pappireddippatti": [11.920, 78.368],

  "Thirupparankundram": [9.870, 78.063], "Thiruthuraipoondi": [10.528, 79.636],  "Pennagaram": [12.133, 77.896],

  "Thiruvaiyaru": [10.887, 79.107], "Thiruvallur": [13.143, 79.914],  "Thalli": [12.361, 77.862],

  "Thiruvarur": [10.773, 79.640], "Thiruverumbur": [10.790, 78.737],  "Uthangarai": [12.244, 78.323],

  "Thiruvidaimarudur": [10.994, 79.457], "Thiruvottiyur": [13.163, 80.300],

  "Thondamuthur": [10.972, 76.826], "Thoothukkudi": [8.804, 78.135],  // Salem

  "Thousand Lights": [13.058, 80.258], "Thuraiyur": [11.140, 78.592],  "Attur": [11.597, 78.600],

  "Tindivanam": [12.234, 79.654], "Tiruchendur": [8.492, 78.117],  "Edappadi": [11.534, 77.804],

  "Tiruchengodu": [11.377, 77.894], "Tiruchirappalli East": [10.822, 78.703],  "Gangavalli": [11.497, 78.650],

  "Tiruchirappalli West": [10.812, 78.660], "Tiruchuli": [9.723, 78.269],  "Mettur": [11.787, 77.801],

  "Tirukkoyilur": [11.962, 79.205], "Tirunelveli": [8.727, 77.687],  "Omalur": [11.745, 78.094],

  "Tirupathur": [12.495, 78.574], "Tiruppattur": [10.135, 78.611],  "Salem North": [11.680, 78.145],

  "Tiruppur North": [11.120, 77.348], "Tiruppur South": [11.086, 77.325],  "Salem South": [11.640, 78.150],

  "Tiruttani": [13.177, 79.637], "Tiruvadanai": [9.739, 78.994],  "Salem West": [11.658, 78.080],

  "Tiruvannamalai": [12.228, 79.072], "Tittakudi": [11.392, 79.423],  "Sankari": [11.487, 77.870],

  "Udhagamandalam": [11.412, 76.694], "Udumalpet": [10.583, 77.250],  "Senthamangalam": [11.800, 78.255],

  "Ulundurpet": [11.852, 79.297], "Usilampatti": [10.095, 77.790],  "Veerapandi": [11.564, 78.005],

  "Uthangarai": [12.244, 78.323], "Uthiramerur": [12.607, 79.754],  "Yercaud": [11.776, 78.206],

  "Valparai": [10.326, 76.972], "Vandavasi": [12.503, 79.594],

  "Vaniyambadi": [12.682, 78.622], "Vanur": [12.108, 79.697],  // Namakkal

  "Vasudevanallur": [9.243, 77.413], "Vedaranyam": [10.375, 79.850],  "Kumarapalayam": [11.453, 77.692],

  "Vedasandur": [10.526, 77.938], "Veerapandi": [11.564, 78.005],  "Namakkal": [11.219, 78.167],

  "Velachery": [12.975, 80.220], "Vellore": [12.922, 79.137],  "Paramathi-Velur": [11.103, 78.010],

  "Veppanahalli": [12.605, 78.630], "Vikravandi": [12.020, 79.558],  "Rasipuram": [11.462, 78.185],

  "Vilathikulam": [9.133, 78.165], "Vilavancode": [8.338, 77.330],  "Senthamangalam": [11.800, 78.255],

  "Villivakkam": [13.107, 80.205], "Villupuram": [11.939, 79.494],  "Tiruchengodu": [11.377, 77.894],

  "Viralimalai": [10.607, 78.576], "Virudhunagar": [9.585, 77.958],

  "Virugampakkam": [13.048, 80.192], "Vridhachalam": [11.510, 79.335]  // Erode

};  "Andhiyur": [11.593, 77.618],

  "Bhavanisagar": [11.456, 77.082],

const allData = JSON.parse(fs.readFileSync('./actual_data/pft_v8_all_predictions.json', 'utf8'));  "Bhavani": [11.443, 77.683],

const names = allData['2021'].map(c => c.constituency);  "Erode East": [11.340, 77.740],

const missing = names.filter(n => !COORDS[n]);  "Erode West": [11.335, 77.680],

if (missing.length > 0) { console.error('Missing:', missing); process.exit(1); }  "Gobichettipalayam": [11.453, 77.434],

console.log(`All ${names.length} constituencies matched.`);  "Modakkurichi": [11.215, 77.520],

  "Perundurai": [11.275, 77.588],

// Build Voronoi tessellation via grid sampling

const GRID_RES = 0.02;  // Coimbatore / Tiruppur

const BOUNDS = { minLng: 76.15, maxLng: 80.45, minLat: 7.95, maxLat: 13.65 };  "Avanashi": [11.266, 77.280],

  "Coimbatore North": [11.020, 76.974],

const cellPoints = {};  "Coimbatore South": [10.983, 76.960],

names.forEach(n => { cellPoints[n] = []; });  "Kavundampalayam": [11.045, 76.945],

  "Kinathukadavu": [10.850, 77.010],

console.log('Building Voronoi grid...');  "Kinathukkadavu": [10.850, 77.010],

for (let lat = BOUNDS.minLat; lat <= BOUNDS.maxLat; lat += GRID_RES) {  "Mettupalayam": [11.298, 76.942],

  for (let lng = BOUNDS.minLng; lng <= BOUNDS.maxLng; lng += GRID_RES) {  "Pollachi": [10.659, 77.004],

    let minDist = Infinity, nearest = null;  "Singanallur": [10.998, 77.032],

    for (const name of names) {  "Sulur": [11.036, 77.126],

      const [clat, clng] = COORDS[name];  "Thondamuthur": [10.972, 76.826],

      const dlat = lat - clat;  "Valparai": [10.326, 76.972],

      const dlng = (lng - clng) * Math.cos(lat * Math.PI / 180);  

      const d = dlat * dlat + dlng * dlng;  // Tiruppur

      if (d < minDist) { minDist = d; nearest = name; }  "Dharapuram": [10.736, 77.522],

    }  "Kangayam": [11.004, 77.561],

    if (nearest) cellPoints[nearest].push([lng, lat]);  "Madathukulam": [10.557, 77.356],

  }  "Palladam": [10.992, 77.282],

}  "Tiruppur North": [11.120, 77.348],

  "Tiruppur South": [11.086, 77.325],

function convexHull(points) {  "Udumalpet": [10.583, 77.250],

  if (points.length < 3) return points;

  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);  // Nilgiris

  const cross = (O, A, B) => (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0]);  "Coonoor": [11.356, 76.795],

  const lower = [];  "Gudalur": [11.505, 76.497],

  for (const p of points) {  "Udhagamandalam": [11.412, 76.694],

    while (lower.length >= 2 && cross(lower[lower.length-2], lower[lower.length-1], p) <= 0) lower.pop();

    lower.push(p);  // Thanjavur / Tiruvarur / Nagapattinam

  }  "Kumbakonam": [10.962, 79.393],

  const upper = [];  "Orathanadu": [10.625, 79.215],

  for (let i = points.length - 1; i >= 0; i--) {  "Papanasam": [10.925, 79.275],

    const p = points[i];  "Pattukkottai": [10.427, 79.319],

    while (upper.length >= 2 && cross(upper[upper.length-2], upper[upper.length-1], p) <= 0) upper.pop();  "Peravurani": [10.290, 79.199],

    upper.push(p);  "Thanjavur": [10.787, 79.138],

  }  "Thiruvaiyaru": [10.887, 79.107],

  upper.pop(); lower.pop();  "Thiruvidaimarudur": [10.994, 79.457],

  return lower.concat(upper);

}  // Tiruvarur

  "Mannargudi": [10.668, 79.451],

const features = names.map(name => {  "Nannilam": [10.880, 79.610],

  const pts = cellPoints[name];  "Thiruthuraipoondi": [10.528, 79.636],

  let ring;  "Thiruvarur": [10.773, 79.640],

  if (pts.length < 3) {  "Vedaranyam": [10.375, 79.850],

    const [lat, lng] = COORDS[name];

    ring = [];  // Nagapattinam  

    for (let a = 0; a < 2 * Math.PI; a += Math.PI / 8) {  "Kilvelur": [10.676, 79.742],

      ring.push([+(lng + 0.04 * Math.cos(a)).toFixed(4), +(lat + 0.04 * Math.sin(a)).toFixed(4)]);  "Mayuram": [11.103, 79.655],

    }  "Nagapattinam": [10.765, 79.842],

  } else {  "Poompuhar": [11.217, 79.810],

    ring = convexHull([...pts]).map(p => [+p[0].toFixed(4), +p[1].toFixed(4)]);  "Sirkazhi": [11.240, 79.735],

  }

  ring.push(ring[0]); // close ring  // Cuddalore / Villupuram

  return {  "Bhuvanagiri": [11.448, 79.645],

    type: "Feature",  "Chidambaram": [11.399, 79.693],

    properties: { name, centroid: [COORDS[name][1], COORDS[name][0]] },  "Cuddalore": [11.747, 79.770],

    geometry: { type: "Polygon", coordinates: [ring] }  "Kattumannarkoil": [11.283, 79.620],

  };  "Kurinjipadi": [11.589, 79.614],

});  "Neyveli": [11.537, 79.497],

  "Panruti": [11.773, 79.570],

const geojson = { type: "FeatureCollection", features };  "Tittakudi": [11.392, 79.423],

const outPath = './src/data/tn_constituencies.json';  "Vridhachalam": [11.510, 79.335],

fs.writeFileSync(outPath, JSON.stringify(geojson));

const stat = fs.statSync(outPath);  // Villupuram

console.log(`Written ${features.length} polygons to ${outPath} (${(stat.size/1024).toFixed(0)} KB)`);  "Gingee": [12.251, 79.423],

  "Kallakurichi": [11.740, 78.960],
  "Mailam": [12.041, 79.548],
  "Rishivandiyam": [11.834, 79.094],
  "Sankarapuram": [11.877, 78.882],
  "Tindivanam": [12.234, 79.654],
  "Tirukkoyilur": [11.962, 79.205],
  "Ulundurpet": [11.852, 79.297],
  "Vanur": [12.108, 79.697],
  "Vikravandi": [12.020, 79.558],
  "Villupuram": [11.939, 79.494],

  // Trichy (Tiruchirappalli)
  "Lalgudi": [10.873, 78.818],
  "Manachanallur": [10.966, 78.850],
  "Musiri": [10.953, 78.445],
  "Srirangam": [10.855, 78.693],
  "Tiruchirappalli East": [10.822, 78.703],
  "Tiruchirappalli West": [10.812, 78.660],
  "Thiruverumbur": [10.790, 78.737],
  "Thuraiyur": [11.140, 78.592],
  "Kulithalai": [10.933, 78.418],
  "Manapparai": [10.610, 78.425],

  // Karur
  "Aravakurichi": [10.706, 78.155],
  "Karur": [10.957, 78.080],
  "Krishnarajapuram": [13.076, 80.305],

  // Perambalur / Ariyalur
  "Ariyalur": [11.140, 79.076],
  "Jayankondam": [11.069, 79.335],
  "Kunnam": [11.297, 79.215],
  "Perambalur": [11.233, 78.873],

  // Pudukkottai
  "Alangudi": [10.363, 78.983],
  "Aranthangi": [10.170, 79.205],
  "Gandharvakottai": [10.569, 78.845],
  "Pudukkottai": [10.381, 78.821],
  "Thirumaiyam": [10.494, 78.756],
  "Viralimalai": [10.607, 78.576],

  // Madurai
  "Madurai Central": [9.920, 78.120],
  "Madurai East": [9.932, 78.145],
  "Madurai North": [9.945, 78.107],
  "Madurai South": [9.893, 78.097],
  "Madurai West": [9.920, 78.075],
  "Melur": [10.032, 78.337],
  "Sholavandan": [10.013, 78.006],
  "Thirupparankundram": [9.870, 78.063],
  "Usilampatti": [10.095, 77.790],

  // Dindigul
  "Dindigul": [10.366, 77.968],
  "Natham": [10.225, 78.200],
  "Nilakkottai": [10.167, 77.854],
  "Oddamchatram": [10.270, 77.683],
  "Palani": [10.451, 77.521],
  "Vedasandur": [10.526, 77.938],

  // Sivaganga
  "Karaikudi": [10.072, 78.776],
  "Manamadurai": [9.808, 78.473],
  "Sivaganga": [10.034, 78.486],
  "Tiruchuli": [9.723, 78.269],

  // Ramanathapuram
  "Mudukulathur": [9.335, 78.864],
  "Mudhukulathur": [9.335, 78.864],
  "Paramakudi": [9.544, 78.591],
  "Ramanathapuram": [9.365, 78.834],
  "Tiruvadanai": [9.739, 78.994],

  // Virudhunagar
  "Aruppukkottai": [9.513, 78.098],
  "Rajapalayam": [9.452, 77.556],
  "Sattur": [9.360, 77.920],
  "Sivakasi": [9.449, 77.810],
  "Srivilliputhur": [9.513, 77.633],
  "Virudhunagar": [9.585, 77.958],

  // Theni
  "Andipatti": [10.017, 77.612],
  "Bodinayakkanur": [10.010, 77.348],
  "Cumbum": [9.738, 77.282],
  "Periyakulam": [10.117, 77.545],
  "Theni": [10.006, 77.470],

  // Tirunelveli
  "Ambasamudram": [8.707, 77.460],
  "Alangulam": [8.866, 77.497],
  "Nanguneri": [8.498, 77.647],
  "Palayamkottai": [8.722, 77.729],
  "Sankarankovil": [9.169, 77.531],
  "Radhapuram": [8.237, 77.735],
  "Tirunelveli": [8.727, 77.687],
  "Vasudevanallur": [9.243, 77.413],

  // Thoothukudi
  "Kovilpatti": [9.171, 77.870],
  "Ottapidaram": [8.988, 78.050],
  "Srivaikuntam": [8.631, 77.915],
  "Thoothukkudi": [8.804, 78.135],
  "Tiruchendur": [8.492, 78.117],
  "Vilathikulam": [9.133, 78.165],

  // Kanniyakumari
  "Colachel": [8.173, 77.261],
  "Kanniyakumari": [8.089, 77.539],
  "Killiyoor": [8.283, 77.323],
  "Kollachal": [8.173, 77.261],
  "Nagercoil": [8.179, 77.427],
  "Padmanabhapuram": [8.236, 77.334],
  "Vilavancode": [8.338, 77.330],

  // Scattered / corrections
  "Athoor": [9.747, 77.861],
  "Kadayanallur": [9.072, 77.340],
  "Tenkasi": [8.960, 77.316],

  // Extra coverage for all 234
  "Mettuppalayam": [11.298, 76.942],
};

// Tamil Nadu state boundary approximate polygon for clipping
const TN_BOUNDARY = [
  [76.23, 11.57], [76.40, 11.75], [76.85, 12.17], [77.12, 12.50],
  [77.35, 12.72], [77.55, 12.81], [77.78, 12.87], [77.90, 12.43],
  [78.00, 12.32], [78.15, 12.15], [78.30, 11.95], [78.55, 11.65],
  [78.80, 11.50], [79.10, 11.35], [79.35, 11.45], [79.55, 11.65],
  [79.70, 11.82], [79.85, 12.05], [80.00, 12.30], [80.15, 12.55],
  [80.25, 12.85], [80.32, 13.05], [80.35, 13.22], [80.30, 13.40],
  [80.17, 13.52], [79.90, 13.35], [79.60, 13.22], [79.30, 13.10],
  [78.90, 12.80], [78.60, 12.65], [78.25, 12.52], [77.78, 12.87],
  // Southern loop
  [79.85, 10.30], [79.90, 10.00], [79.80, 9.65], [79.50, 9.35],
  [79.10, 9.10], [78.80, 8.85], [78.50, 8.55], [78.15, 8.25],
  [77.80, 8.10], [77.50, 8.08], [77.20, 8.30], [77.00, 8.52],
  [76.70, 8.87], [76.50, 9.25], [76.40, 9.55], [76.30, 9.98],
  [76.25, 10.45], [76.30, 10.95], [76.23, 11.57]
];

// Get all constituency names from real data
const allData = JSON.parse(fs.readFileSync('./actual_data/pft_v8_all_predictions.json', 'utf8'));
const constituencyNames = allData['2021'].map(c => c.constituency);

console.log(`Total constituencies in data: ${constituencyNames.length}`);

// Match coordinates to data constituency names
const matched = [];
const unmatched = [];

constituencyNames.forEach(name => {
  if (CONSTITUENCY_COORDS[name]) {
    matched.push(name);
  } else {
    unmatched.push(name);
  }
});

console.log(`Matched: ${matched.length}`);
console.log(`Unmatched: ${unmatched.length}`);
if (unmatched.length > 0) {
  console.log('Unmatched names:', unmatched);
}
