// Generates GeoJSON with Voronoi polygons for all 234 TN constituencies
const fs = require('fs');

const COORDS = {
  "Alandur": [13.003, 80.206], "Alangudi": [10.363, 78.983], "Alangulam": [8.866, 77.497],
  "Ambasamudram": [8.707, 77.460], "Ambattur": [13.114, 80.162], "Ambur": [12.790, 78.718],
  "Anaicut": [12.636, 78.731], "Andhiyur": [11.593, 77.618], "Andipatti": [10.017, 77.612],
  "Anna Nagar": [13.085, 80.210], "Arakkonam": [13.084, 79.671], "Arani": [12.669, 79.281],
  "Aranthangi": [10.170, 79.205], "Aravakurichi": [10.706, 78.155], "Arcot": [12.905, 79.316],
  "Ariyalur": [11.140, 79.076], "Aruppukkottai": [9.513, 78.098], "Athoor": [9.747, 77.861],
  "Attur": [11.597, 78.600], "Avadi": [13.116, 80.097], "Avanashi": [11.266, 77.280],
  "Bargur": [12.296, 78.387], "Bhavani": [11.443, 77.683], "Bhavanisagar": [11.456, 77.082],
  "Bhuvanagiri": [11.448, 79.645], "Bodinayakkanur": [10.010, 77.348],
  "Chengalpattu": [12.693, 79.976], "Chengam": [12.310, 78.793], "Chepauk": [13.063, 80.277],
  "Cheyyar": [12.661, 79.544], "Cheyyur": [12.352, 80.003], "Chidambaram": [11.399, 79.693],
  "Coimbatore North": [11.020, 76.974], "Coimbatore South": [10.983, 76.960],
  "Coonoor": [11.356, 76.795], "Cuddalore": [11.747, 79.770], "Cumbum": [9.738, 77.282],
  "Dharapuram": [10.736, 77.522], "Dharmapuri": [12.126, 78.157], "Dindigul": [10.366, 77.968],
  "Dr. Radhakrishnan Nagar": [13.118, 80.260], "Edappadi": [11.534, 77.804],
  "Egmore": [13.073, 80.257], "Erode East": [11.340, 77.740], "Erode West": [11.335, 77.680],
  "Gandharvakottai": [10.569, 78.845], "Gangavalli": [11.497, 78.650],
  "Gingee": [12.251, 79.423], "Gobichettipalayam": [11.453, 77.434],
  "Gudalur": [11.505, 76.497], "Gudiyattam": [12.945, 78.872],
  "Gummidipoondi": [13.398, 80.117], "Harbour": [13.095, 80.295],
  "Harur": [12.044, 78.484], "Hosur": [12.735, 77.832],
  "Jayankondam": [11.069, 79.335], "Jolarpet": [12.565, 78.573],
  "Kadayanallur": [9.072, 77.340], "Kalasapakkam": [12.466, 79.207],
  "Kallakurichi": [11.740, 78.960], "Kancheepuram": [12.834, 79.710],
  "Kangayam": [11.004, 77.561], "Kanniyakumari": [8.089, 77.539],
  "Karaikudi": [10.072, 78.776], "Karur": [10.957, 78.080],
  "Katpadi": [12.975, 79.163], "Kattumannarkoil": [11.283, 79.620],
  "Kavundampalayam": [11.045, 76.945], "Killiyoor": [8.283, 77.323],
  "Kilpennathur": [12.345, 79.045], "Kilvaithinankuppam": [11.740, 79.680],
  "Kilvelur": [10.676, 79.742], "Kinathukkadavu": [10.850, 77.010],
  "Kolathur": [13.125, 80.225], "Kollachal": [8.173, 77.261],
  "Kovilpatti": [9.171, 77.870], "Krishnagiri": [12.526, 78.214],
  "Krishnarajapuram": [13.076, 80.305], "Kulithalai": [10.933, 78.418],
  "Kumarapalayam": [11.453, 77.692], "Kumbakonam": [10.962, 79.393],
  "Kunnam": [11.297, 79.215], "Kurinjipadi": [11.589, 79.614],
  "Lalgudi": [10.873, 78.818], "Madathukulam": [10.557, 77.356],
  "Madavaram": [13.147, 80.232], "Madurai Central": [9.920, 78.120],
  "Madurai East": [9.932, 78.145], "Madurai North": [9.945, 78.107],
  "Madurai South": [9.893, 78.097], "Madurai West": [9.920, 78.075],
  "Maduranthakam": [12.468, 79.887], "Maduravoyal": [13.063, 80.170],
  "Mailam": [12.041, 79.548], "Manachanallur": [10.966, 78.850],
  "Manamadurai": [9.808, 78.473], "Manapparai": [10.610, 78.425],
  "Mannargudi": [10.668, 79.451], "Mayuram": [11.103, 79.655],
  "Melur": [10.032, 78.337], "Mettuppalayam": [11.298, 76.942],
  "Mettur": [11.787, 77.801], "Modakkurichi": [11.215, 77.520],
  "Mudhukulathur": [9.335, 78.864], "Musiri": [10.953, 78.445],
  "Mylapore": [13.035, 80.267], "Nagapattinam": [10.765, 79.842],
  "Nagercoil": [8.179, 77.427], "Namakkal": [11.219, 78.167],
  "Nanguneri": [8.498, 77.647], "Nannilam": [10.880, 79.610],
  "Natham": [10.225, 78.200], "Neyveli": [11.537, 79.497],
  "Nilakkottai": [10.167, 77.854], "Oddamchatram": [10.270, 77.683],
  "Omalur": [11.745, 78.094], "Orathanadu": [10.625, 79.215],
  "Ottapidaram": [8.988, 78.050], "Padmanabhapuram": [8.236, 77.334],
  "Palacodu": [12.243, 78.074], "Palani": [10.451, 77.521],
  "Palayamkottai": [8.722, 77.729], "Palladam": [10.992, 77.282],
  "Pallavaram": [12.967, 80.150], "Panruti": [11.773, 79.570],
  "Papanasam": [10.925, 79.275], "Pappireddippatti": [11.920, 78.368],
  "Paramakudi": [9.544, 78.591], "Paramathi-Velur": [11.103, 78.010],
  "Pattukkottai": [10.427, 79.319], "Pennagaram": [12.133, 77.896],
  "Perambalur": [11.233, 78.873], "Perambur": [13.110, 80.250],
  "Peravurani": [10.290, 79.199], "Periyakulam": [10.117, 77.545],
  "Perundurai": [11.275, 77.588], "Pollachi": [10.659, 77.004],
  "Polur": [12.515, 79.115], "Ponneri": [13.337, 80.193],
  "Poompuhar": [11.217, 79.810], "Poonamallee": [13.047, 80.095],
  "Pudukkottai": [10.381, 78.821], "Radhapuram": [8.237, 77.735],
  "Rajapalayam": [9.452, 77.556], "Ramanathapuram": [9.365, 78.834],
  "Ranipet": [12.937, 79.343], "Rasipuram": [11.462, 78.185],
  "Rishivandiyam": [11.834, 79.094], "Royapuram": [13.115, 80.290],
  "Saidapet": [13.022, 80.225], "Salem North": [11.680, 78.145],
  "Salem South": [11.640, 78.150], "Salem West": [11.658, 78.080],
  "Sankarankovil": [9.169, 77.531], "Sankarapuram": [11.877, 78.882],
  "Sankari": [11.487, 77.870], "Sattur": [9.360, 77.920],
  "Senthamangalam": [11.800, 78.255], "Sholavandan": [10.013, 78.006],
  "Sholingur": [12.784, 79.422], "Shozhinganallur": [12.905, 80.228],
  "Singanallur": [10.998, 77.032], "Sirkazhi": [11.240, 79.735],
  "Sivaganga": [10.034, 78.486], "Sivakasi": [9.449, 77.810],
  "Sriperumbudur": [12.971, 79.945], "Srirangam": [10.855, 78.693],
  "Srivaikuntam": [8.631, 77.915], "Srivilliputhur": [9.513, 77.633],
  "Sulur": [11.036, 77.126], "T-Nagar": [13.040, 80.233],
  "Tambaram": [12.924, 80.118], "Tenkasi": [8.960, 77.316],
  "Thalli": [12.361, 77.862], "Thanjavur": [10.787, 79.138],
  "Thiru-Vi-Ka-Nagar": [13.145, 80.255], "Thirumangalam": [9.818, 77.983],
  "Thirumaiyam": [10.494, 78.756], "Thiruporur": [12.726, 80.181],
  "Thirupparankundram": [9.870, 78.063], "Thiruthuraipoondi": [10.528, 79.636],
  "Thiruvaiyaru": [10.887, 79.107], "Thiruvallur": [13.143, 79.914],
  "Thiruvarur": [10.773, 79.640], "Thiruverumbur": [10.790, 78.737],
  "Thiruvidaimarudur": [10.994, 79.457], "Thiruvottiyur": [13.163, 80.300],
  "Thondamuthur": [10.972, 76.826], "Thoothukkudi": [8.804, 78.135],
  "Thousand Lights": [13.058, 80.258], "Thuraiyur": [11.140, 78.592],
  "Tindivanam": [12.234, 79.654], "Tiruchendur": [8.492, 78.117],
  "Tiruchengodu": [11.377, 77.894], "Tiruchirappalli East": [10.822, 78.703],
  "Tiruchirappalli West": [10.812, 78.660], "Tiruchuli": [9.723, 78.269],
  "Tirukkoyilur": [11.962, 79.205], "Tirunelveli": [8.727, 77.687],
  "Tirupathur": [12.495, 78.574], "Tiruppattur": [10.135, 78.611],
  "Tiruppur North": [11.120, 77.348], "Tiruppur South": [11.086, 77.325],
  "Tiruttani": [13.177, 79.637], "Tiruvadanai": [9.739, 78.994],
  "Tiruvannamalai": [12.228, 79.072], "Tittakudi": [11.392, 79.423],
  "Udhagamandalam": [11.412, 76.694], "Udumalpet": [10.583, 77.250],
  "Ulundurpet": [11.852, 79.297], "Usilampatti": [10.095, 77.790],
  "Uthangarai": [12.244, 78.323], "Uthiramerur": [12.607, 79.754],
  "Valparai": [10.326, 76.972], "Vandavasi": [12.503, 79.594],
  "Vaniyambadi": [12.682, 78.622], "Vanur": [12.108, 79.697],
  "Vasudevanallur": [9.243, 77.413], "Vedaranyam": [10.375, 79.850],
  "Vedasandur": [10.526, 77.938], "Veerapandi": [11.564, 78.005],
  "Velachery": [12.975, 80.220], "Vellore": [12.922, 79.137],
  "Veppanahalli": [12.605, 78.630], "Vikravandi": [12.020, 79.558],
  "Vilathikulam": [9.133, 78.165], "Vilavancode": [8.338, 77.330],
  "Villivakkam": [13.107, 80.205], "Villupuram": [11.939, 79.494],
  "Viralimalai": [10.607, 78.576], "Virudhunagar": [9.585, 77.958],
  "Virugampakkam": [13.048, 80.192], "Vridhachalam": [11.510, 79.335],
  "Yercaud": [11.776, 78.206]
};

const allData = JSON.parse(fs.readFileSync('./actual_data/pft_v8_all_predictions.json', 'utf8'));
const names = allData['2021'].map(c => c.constituency);
const missing = names.filter(n => !COORDS[n]);
if (missing.length > 0) { console.error('Missing:', missing); process.exit(1); }
console.log('All ' + names.length + ' constituencies matched.');

// Voronoi via grid sampling
const GRID_RES = 0.02;
const BOUNDS = { minLng: 76.15, maxLng: 80.45, minLat: 7.95, maxLat: 13.65 };
const cellPoints = {};
names.forEach(function(n) { cellPoints[n] = []; });

console.log('Building Voronoi grid...');
for (let lat = BOUNDS.minLat; lat <= BOUNDS.maxLat; lat += GRID_RES) {
  for (let lng = BOUNDS.minLng; lng <= BOUNDS.maxLng; lng += GRID_RES) {
    let minDist = Infinity, nearest = null;
    for (let ni = 0; ni < names.length; ni++) {
      const name = names[ni];
      const clat = COORDS[name][0], clng = COORDS[name][1];
      const dlat = lat - clat;
      const dlng = (lng - clng) * Math.cos(lat * Math.PI / 180);
      const d = dlat * dlat + dlng * dlng;
      if (d < minDist) { minDist = d; nearest = name; }
    }
    if (nearest) cellPoints[nearest].push([lng, lat]);
  }
}

function convexHull(points) {
  if (points.length < 3) return points;
  points.sort(function(a, b) { return a[0] - b[0] || a[1] - b[1]; });
  function cross(O, A, B) { return (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0]); }
  var lower = [];
  for (var i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length-2], lower[lower.length-1], points[i]) <= 0) lower.pop();
    lower.push(points[i]);
  }
  var upper = [];
  for (var i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length-2], upper[upper.length-1], points[i]) <= 0) upper.pop();
    upper.push(points[i]);
  }
  upper.pop(); lower.pop();
  return lower.concat(upper);
}

var features = names.map(function(name) {
  var pts = cellPoints[name];
  var ring;
  if (pts.length < 3) {
    var lat = COORDS[name][0], lng = COORDS[name][1];
    ring = [];
    for (var a = 0; a < 2 * Math.PI; a += Math.PI / 8) {
      ring.push([+(lng + 0.04 * Math.cos(a)).toFixed(4), +(lat + 0.04 * Math.sin(a)).toFixed(4)]);
    }
  } else {
    ring = convexHull(pts.slice()).map(function(p) { return [+p[0].toFixed(4), +p[1].toFixed(4)]; });
  }
  ring.push(ring[0]);
  return {
    type: "Feature",
    properties: { name: name, centroid: [COORDS[name][1], COORDS[name][0]] },
    geometry: { type: "Polygon", coordinates: [ring] }
  };
});

var geojson = { type: "FeatureCollection", features: features };
var outPath = './src/data/tn_constituencies.json';
fs.writeFileSync(outPath, JSON.stringify(geojson));
var stat = fs.statSync(outPath);
console.log('Written ' + features.length + ' polygons to ' + outPath + ' (' + (stat.size/1024).toFixed(0) + ' KB)');
