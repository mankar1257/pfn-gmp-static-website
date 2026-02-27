export const constituencies = [
  "Alandur", "Alangudi", "Alangulam", "Ambasamudram", "Ambattur", "Ambur", "Anaicut", "Andhiyur", "Andipatti", "Anna Nagar", "Arakkonam", "Arani", "Aranthangi", "Aravakurichi", "Arcot", "Ariyalur", "Aruppukkottai", "Athoor", "Attur", "Avadi", "Avanashi", "Bargur", "Bhavani", "Bhavanisagar", "Bhuvanagiri", "Bodinayakkanur", "Chengalpattu", "Chengam", "Chepauk", "Cheyyar", "Cheyyur", "Chidambaram", "Coimbatore North", "Coimbatore South", "Coonoor", "Cuddalore", "Cumbum", "Dharapuram", "Dharmapuri", "Dindigul", "Dr. Radhakrishnan Nagar", "Edappadi", "Egmore", "Erode East", "Erode West", "Gandharvakottai", "Gangavalli", "Gingee", "Gobichettipalayam", "Gudalur", "Gudiyattam", "Gummidipoondi", "Harbour", "Harur", "Hosur", "Jayankondam", "Jolarpet", "Kadayanallur", "Kalasapakkam", "Kallakurichi", "Kancheepuram", "Kangayam", "Kanniyakumari", "Karaikudi", "Karur", "Katpadi", "Kattumannarkoil", "Kavundampalayam", "Killiyoor", "Kilpennathur", "Kilvaithinankuppam", "Kilvelur", "Kinathukkadavu", "Kolathur", "Kollachal", "Kovilpatti", "Krishnagiri", "Krishnarajapuram", "Kulithalai", "Kumarapalayam", "Kumbakonam", "Kunnam", "Kurinjipadi", "Lalgudi", "Madathukulam", "Madavaram", "Madurai Central", "Madurai East", "Madurai North", "Madurai South", "Madurai West", "Maduranthakam", "Maduravoyal", "Mailam", "Manachanallur", "Manamadurai", "Manapparai", "Mannargudi", "Mayuram", "Melur", "Mettuppalayam", "Mettur", "Modakkurichi", "Mudhukulathur", "Musiri", "Mylapore", "Nagapattinam", "Nagercoil", "Namakkal", "Nanguneri", "Nannilam", "Natham", "Neyveli", "Nilakkottai", "Oddamchatram", "Omalur", "Orathanadu", "Ottapidaram", "Padmanabhapuram", "Palacodu", "Palani", "Palayamkottai", "Palladam", "Pallavaram", "Panruti", "Papanasam", "Pappireddippatti", "Paramakudi", "Paramathi-Velur", "Pattukkottai", "Pennagaram", "Perambalur", "Perambur", "Peravurani", "Periyakulam", "Perundurai", "Pollachi", "Polur", "Ponneri", "Poompuhar", "Poonamallee", "Pudukkottai", "Radhapuram", "Rajapalayam", "Ramanathapuram", "Ranipet", "Rasipuram", "Rishivandiyam", "Royapuram", "Saidapet", "Salem North", "Salem South", "Salem West", "Sankarankovil", "Sankarapuram", "Sankari", "Sattur", "Senthamangalam", "Sholavandan", "Sholingur", "Shozhinganallur", "Singanallur", "Sirkazhi", "Sivaganga", "Sivakasi", "Sriperumbudur", "Srirangam", "Srivaikuntam", "Srivilliputhur", "Sulur", "T-Nagar", "Tambaram", "Tenkasi", "Thalli", "Thanjavur", "Thiru-Vi-Ka-Nagar", "Thirumaiyam", "Thirumangalam", "Thiruporur", "Thirupparankundram", "Thiruthuraipoondi", "Thiruvaiyaru", "Thiruvallur", "Thiruvarur", "Thiruverumbur", "Thiruvidaimarudur", "Thiruvottiyur", "Thondamuthur", "Thoothukkudi", "Thousand Lights", "Thuraiyur", "Tindivanam", "Tiruchendur", "Tiruchengodu", "Tiruchirappalli East", "Tiruchirappalli West", "Tiruchuli", "Tirukkoyilur", "Tirunelveli", "Tirupathur", "Tiruppattur", "Tiruppur North", "Tiruppur South", "Tiruttani", "Tiruvadanai", "Tiruvannamalai", "Tittakudi", "Udhagamandalam", "Udumalpet", "Ulundurpet", "Usilampatti", "Uthangarai", "Uthiramerur", "Valparai", "Vandavasi", "Vaniyambadi", "Vanur", "Vasudevanallur", "Vedaranyam", "Vedasandur", "Veerapandi", "Velachery", "Vellore", "Veppanahalli", "Vikravandi", "Vilathikulam", "Vilavancode", "Villivakkam", "Villupuram", "Viralimalai", "Virudhunagar", "Virugampakkam", "Vridhachalam", "Yercaud"
];

const parties = ["DMK", "ADMK", "INC", "BJP", "PMK", "DMDK", "VCK", "CPM", "CPI", "NTK"];

// Deterministic random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export interface ConstituencyData {
  constituency: string;
  actual_winner: string | null;
  actual_margin: number | null;
  scenario_A: string;
  scenario_A_margin: number;
  scenario_A_alliance: string;
  scenario_B: string;
  scenario_B_margin: number;
  scenario_B_alliance: string;
  scenario_C: string;
  scenario_C_margin: number;
  scenario_C_alliance: string;
  inc_layer: {
    rho: number;
    mean_share: number;
  };
  constituency_rho: number;
}

export type YearData = Record<string, ConstituencyData[]>;

export const generateData = (): YearData => {
  const years = [2011, 2016, 2021, 2026];
  const data: YearData = {};

  years.forEach((year, yearIndex) => {
    data[year] = constituencies.map((c, i) => {
      const seed = year * 1000 + i;
      
      // Determine base winner for the year
      let baseWinner = "ADMK";
      if (year === 2011) baseWinner = seededRandom(seed) > 0.6 ? "DMDK" : "ADMK";
      if (year === 2016) baseWinner = seededRandom(seed) > 0.5 ? "DMK" : "ADMK";
      if (year === 2021) baseWinner = seededRandom(seed) > 0.3 ? "DMK" : "ADMK";
      
      // Add some minor parties
      if (seededRandom(seed + 1) > 0.85) {
        baseWinner = parties[Math.floor(seededRandom(seed + 2) * parties.length)];
      }

      const is2026 = year === 2026;

      return {
        constituency: c,
        actual_winner: is2026 ? null : baseWinner,
        actual_margin: is2026 ? null : (seededRandom(seed + 3) * 0.4 - 0.2),
        
        // Scenario A: INC + DMK
        scenario_A: seededRandom(seed + 4) > 0.3 ? "DMK" : baseWinner,
        scenario_A_margin: seededRandom(seed + 5) * 0.5,
        scenario_A_alliance: "DMK",
        
        // Scenario B: INC + ADMK
        scenario_B: seededRandom(seed + 6) > 0.3 ? "ADMK" : baseWinner,
        scenario_B_margin: seededRandom(seed + 7) * 0.5,
        scenario_B_alliance: "ADMK",
        
        // Scenario C: INC + Others (Third Front)
        scenario_C: seededRandom(seed + 8) > 0.7 ? "INC" : baseWinner,
        scenario_C_margin: seededRandom(seed + 9) * 0.3,
        scenario_C_alliance: "INC",
        
        inc_layer: {
          rho: seededRandom(seed + 10) * 0.8,
          mean_share: seededRandom(seed + 11) * 0.4
        },
        constituency_rho: seededRandom(seed + 12) * 0.6 + 0.4
      };
    });
  });

  return data;
};

export const electionData = generateData();
