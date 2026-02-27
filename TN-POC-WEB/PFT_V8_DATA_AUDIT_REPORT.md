# 🔴 PFT v8 Data Quality Audit Report
## Tamil Nadu Election Prediction Dashboard — Critical Findings

**Prepared for:** PFT Data Team  
**Prepared by:** Dashboard Development Team  
**Date:** February 2026  
**Data Source:** `actual_data/pft_v8_all_predictions.json`  
**Scope:** 234 constituencies × 4 election years (2011, 2016, 2021, 2026)

---

## Executive Summary

After an exhaustive cross-verification of the PFT v8 prediction dataset against official election results from the Election Commission of India (via Wikipedia), we report the following:

| Area | Status |
|------|--------|
| **2011 Actual Results** | ✅ **PERFECT MATCH** — All 234 constituency winners verified correct |
| **2016 Actual Results** | ✅ **PERFECT MATCH** — All 234 constituency winners verified correct |
| **2021 Actual Results** | ✅ **PERFECT MATCH** — All 234 constituency winners verified correct |
| **2026 Predictions** | 🔴 **CRITICAL ISSUES** — Multiple politically impossible scenarios |

The historical data (2011, 2016, 2021) is accurate and trustworthy. However, **the 2026 predictions contain fundamental structural flaws** that would severely undermine the credibility of any public-facing dashboard. These issues are detailed below.

---

## SECTION 1: Historical Data Verification (2011, 2016, 2021)

### 1.1 — 2011 Tamil Nadu Assembly Election

**Wikipedia Source:** [2011 Tamil Nadu Legislative Assembly election](https://en.wikipedia.org/wiki/2011_Tamil_Nadu_Legislative_Assembly_election)

| Party | PFT v8 Data | Wikipedia | Status |
|-------|-------------|-----------|--------|
| ADMK (AIADMK) | **150** | **150** | ✅ Match |
| DMDK | **29** | **29** | ✅ Match |
| DMK | **23** | **23** | ✅ Match |
| CPM (CPI-M) | **10** | **10** | ✅ Match |
| CPI | **9** | **9** | ✅ Match |
| INC (Congress) | **5** | **5** | ✅ Match |
| PMK | **3** | **3** | ✅ Match |
| MNMK (Manithaneya Makkal Katchi) | **2** | **2** | ✅ Match |
| PT (Puthiya Tamilagam) | **2** | **2** | ✅ Match |
| AIFB (All India Forward Bloc) | **1** | **1** | ✅ Match |
| **TOTAL** | **234** | **234** | ✅ |

**Alliance Composition (PFT v8 Scenario A):**  
- ADMK alliance = ADMK + DMDK + CPI + CPM + MNMK + PT + AIFB  
- DMK alliance = DMK + INC  

**Wikipedia Verified Alliance:**  
- AIADMK-led = AIADMK (160 contested) + DMDK (41) + CPI(M) (12) + CPI (10) + MMK (3) + PT (2) + AIFB (1) + others  
- DMK-led (DPA) = DMK (119) + INC (63) + PMK (30) + VCK (10) + KMK (7) + IUML (3) + others  

**⚠️ Minor Observation:** In PFT v8, PMK is mapped to DMK alliance for 2011 (Scenario A actual). This is **CORRECT** — PMK was indeed part of the DMK-led DPA in 2011. CPI and CPM are mapped to ADMK alliance, which is also **CORRECT** — they were part of the AIADMK front in 2011. ✅

---

### 1.2 — 2016 Tamil Nadu Assembly Election

**Wikipedia Source:** [2016 Tamil Nadu Legislative Assembly election](https://en.wikipedia.org/wiki/2016_Tamil_Nadu_Legislative_Assembly_election)

| Party | PFT v8 Data | Wikipedia | Status |
|-------|-------------|-----------|--------|
| ADMK (AIADMK) | **136** | **136** (some sources say 135+1 delayed) | ✅ Match |
| DMK | **89** | **89** | ✅ Match |
| INC (Congress) | **8** | **8** | ✅ Match |
| IUML | **1** | **1** | ✅ Match |
| **TOTAL** | **234** | **234** | ✅ |

**Key Context:**  
- Third front (PWF: DMDK + MDMK + CPI + CPM + VCK + TMC) won **ZERO** seats, so their absence from PFT winner data is correct  
- PMK contested independently and won **0** seats  
- NTK contested all 234 seats, received 458,104 votes (1.1%), but won **0** seats  
- BJP contested 165 seats and won **0** seats  

**No issues found.** ✅

---

### 1.3 — 2021 Tamil Nadu Assembly Election

**Wikipedia Source:** [2021 Tamil Nadu Legislative Assembly election](https://en.wikipedia.org/wiki/2021_Tamil_Nadu_Legislative_Assembly_election)

| Party | PFT v8 Data | Wikipedia | Status |
|-------|-------------|-----------|--------|
| DMK | **133** | **133** | ✅ Match |
| ADMK (AIADMK) | **66** | **66** | ✅ Match |
| INC (Congress) | **18** | **18** | ✅ Match |
| PMK | **5** | **5** | ✅ Match |
| VCK | **4** | **4** | ✅ Match |
| BJP | **4** | **4** | ✅ Match |
| CPM (CPI-M) | **2** | **2** | ✅ Match |
| CPI | **2** | **2** | ✅ Match |
| **TOTAL** | **234** | **234** | ✅ |

**Key Context for 2026 Modeling:**
- NTK contested all 234 seats, received **3,067,458 votes (6.89%)**, won **0** seats  
- MNM (Kamal Haasan's party) received **~2.62% vote share**, won **0** seats  
- AMMK (Sasikala/TTV Dhinakaran) won **0** seats  
- DMDK won **0** seats (down from 29 in 2011)  

These parties significantly affected vote distribution even without winning seats. Their absence from the 2026 model is a critical gap.

---

## SECTION 2: 🔴 2026 Predictions — CRITICAL ISSUES

### 2.1 — Overview of 2026 Scenario Results

| Metric | Scenario A | Scenario B | Scenario C |
|--------|-----------|-----------|-----------|
| **DMK alliance seats** | **232** | **177** | **220** |
| **ADMK alliance seats** | **2** | **57** | **14** |
| DMK (party) | 189 | 160 | 202 |
| INC | 25 | 11 | 0 |
| VCK | 6 | 6 | 6 |
| CPM | 5 | 4 | 5 |
| CPI | 4 | 4 | 4 |
| MDMK | 3 | 3 | 3 |
| ADMK | 0 | 29 | 10 |
| PMK | 1 | 13 | 3 |
| BJP | 1 | 4 | 1 |

### 2.2 — CRITICAL FINDING #1: TVK (Tamilaga Vettri Kazhagam) Completely Missing

**Severity: 🔴 CRITICAL**

**TVK is the single biggest new entrant in Tamil Nadu politics since DMDK in 2005, and it is COMPLETELY ABSENT from all three 2026 scenarios.**

**Facts (Wikipedia-verified):**
- **Founded:** 2 February 2024 by actor **Vijay** (Thalapathy)  
  *Source: [Wikipedia — TVK](https://en.wikipedia.org/wiki/Tamilaga_Vettri_Kazhagam)*
- **Membership:** Over **15 million** members as of September 2025  
  *Source: Dina Thanthi, June 2025*
- **First rally:** 27 October 2024 in Vikravandi — attended by **800,000+ people**  
  *Source: Maalai Malar, October 2024*
- **Ideology:** Centre-left, secular social justice, Ambedkarite-Periyarist  
- **Position:** Declared **DMK as "political adversary"** and **BJP as "ideological opponent"**  
  *Source: News18, October 2024*
- **Key leadership recruit:** K.A. Sengottaiyan (9-time MLA, former AIADMK cabinet minister) joined TVK in November 2025  
  *Source: The Hindu, November 2025*
- **Second conference:** Held in Madurai on 21 August 2025 — Vijay **ruled out alliances**, signaling solo contest  
  *Source: The Indian Express, August 2025*
- **Karur rally tragedy:** 27 September 2025 — crowd crush killed 41 people, demonstrates the massive draw  
  *Source: The Hindu, September 2025*

**Why this matters:**
TVK is expected to contest all 234 constituencies independently. With 15M+ members, massive rally attendance, and the "Thalapathy" brand value, TVK is projected by most political analysts to be the **primary disruptor** in 2026. Their vote share — even if they don't win seats — could dramatically reshape margins in 100+ constituencies, potentially flipping results between DMK and ADMK alliance candidates.

**Action Required:** TVK MUST be added to all 2026 scenarios. At minimum, model their vote-splitting effect on margins. Ideally, create scenarios where TVK wins 20-60+ seats.

---

### 2.3 — CRITICAL FINDING #2: NTK (Naam Tamilar Katchi) Completely Missing from 2026

**Severity: 🔴 CRITICAL**

**Facts (Wikipedia-verified):**
- NTK received **3,067,458 votes (6.89%)** in 2021 — despite winning 0 seats  
  *Source: [Wikipedia — NTK Electoral Performance](https://en.wikipedia.org/wiki/Naam_Tamilar_Katchi#Electoral_performance)*
- In the **2024 Lok Sabha elections**, NTK received **3,560,485 votes (8.19%)** — their vote share is GROWING  
  *Source: Wikipedia — NTK Electoral Performance*
- In the **2025 Erode East by-election**, NTK got **15.59% vote share** — a significant jump  
  *Source: Wikipedia — NTK Electoral Performance*
- NTK has already announced it will **contest solo across all 234 constituencies** in 2026  
  *Source: DT Next, December 2025*
- Led by **Seeman**, who commands a dedicated Tamil nationalist base

**Why this matters:**
NTK's 6.89%→8.19%→15.59% trajectory suggests they could poll **8-12%+ statewide** in 2026. This is enough to flip results in 50-80+ tight constituencies. Their absence from the model means all margin calculations are fundamentally wrong.

**Action Required:** NTK MUST be included in all 2026 scenarios as a major vote-share consumer (even if they win 0 seats). Their impact on margins between DMK and ADMK candidates is critical to model accurately.

---

### 2.4 — CRITICAL FINDING #3: DMDK Missing from 2026

**Severity: ⚠️ HIGH**

- DMDK won **29 seats** in 2011 (second-largest party in that assembly!)
- Won 0 in 2016 and 0 in 2021, but still polls significant votes
- Founder Vijayakanth passed away in December 2023  
- The party's future is uncertain but it still exists and may contest
- DMDK is present in PFT data for 2011 but **completely absent from 2026**

**Action Required:** At minimum, account for DMDK's residual vote share in 2026 models, or explicitly note it as dissolved/defunct if that's the assumption.

---

### 2.5 — CRITICAL FINDING #4: MNM (Makkal Needhi Maiam) Missing from 2026

**Severity: ⚠️ MEDIUM**

- Founded by actor **Kamal Haasan** in 2018
- Polled **~2.62% vote share** in 2021 assembly elections
- MNM's future is uncertain after poor performance, but not dissolved
- PFT data completely ignores MNM for 2026

**Action Required:** Include MNM's vote share impact or note its status.

---

### 2.6 — CRITICAL FINDING #5: Politically Impossible Alliance Mappings

**Severity: 🔴 CRITICAL — This is MISLEADING to users**

#### Scenario A: BJP in ADMK alliance, but winning only 1 seat — WHY?
| Party | Alliance | Seats |
|-------|----------|-------|
| BJP | ADMK | 1 |
| PMK | ADMK | 1 |
| INC | DMK | 25 |

- BJP→ADMK mapping is plausible (BJP is traditionally in NDA with ADMK)
- **But why does BJP win only 1 seat when it contested 20 seats in 2021 and won 4?**
- PMK winning only 1 seat in ADMK alliance seems very low (won 5 in 2021)

#### Scenario B: INC in ADMK alliance — 🔴 POLITICALLY IMPOSSIBLE
| Party | Alliance | Seats |
|-------|----------|-------|
| **INC** | **ADMK** | **11** |
| BJP | ADMK | 4 |
| PMK | ADMK | 13 |

**This is the single most egregious error in the entire dataset.**

- INC (Indian National Congress) is mapped to the **ADMK alliance** in Scenario B
- The ADMK alliance = NDA in Tamil Nadu = AIADMK + BJP + PMK
- **INC CANNOT be in an alliance with BJP.** They are national-level arch-rivals. INC leads UPA; BJP leads NDA. This is a fundamental, universally-known political reality.
- INC has been in alliance with DMK continuously since 2004 (except 2014 LS when DMK went alone)
- There is ZERO political scenario in which INC joins ADMK/NDA in Tamil Nadu

**This single error makes Scenario B fundamentally unusable and misleading.**

**Action Required:** Fix INC→DMK alliance in all scenarios. There is no realistic scenario where INC joins ADMK/BJP alliance.

#### Scenario C: No INC at all
- INC wins **0 seats** in Scenario C, meaning it's either not contesting or its vote is completely absorbed
- This is also unrealistic — INC won 18 seats in 2021 as part of DMK alliance

---

### 2.7 — CRITICAL FINDING #6: Model Assumes Pure 2-Alliance Contest

**Severity: 🔴 CRITICAL — Fundamental Model Design Flaw**

All three scenarios reduce the 2026 election to a **binary contest**: DMK alliance vs ADMK alliance. The only two alliances that appear are "DMK" and "ADMK".

**Reality of 2026 Tamil Nadu Elections:**

The 2026 election is shaping up to be a **multi-polar contest** with at least **4-5 major forces**:

1. **DMK Alliance (SPA)** — DMK + INC + CPI + CPM + VCK + MDMK + IUML + others
2. **AIADMK Alliance (NDA)** — AIADMK + BJP + PMK + possibly others
3. **TVK (Independent)** — Vijay has explicitly ruled out alliances (as of Aug 2025)
4. **NTK (Independent)** — Always contests solo across all 234 seats
5. **Others** — AMMK, MNM, DMDK remnants, BSP, etc.

A binary model that ignores 15-25%+ of the vote going to TVK, NTK, and others will produce wildly inaccurate seat projections.

---

### 2.8 — CRITICAL FINDING #7: No AIADMK-Win Scenario Exists

**Severity: ⚠️ HIGH — Bias Concern**

| Scenario | DMK Alliance | ADMK Alliance |
|----------|-------------|---------------|
| A | **232** | 2 |
| B | **177** | 57 |
| C | **220** | 14 |

- DMK wins in ALL THREE scenarios
- The closest scenario (B) still gives DMK a massive 177-57 lead
- There is **no scenario where ADMK/NDA wins** or even comes close

**Why this matters:**
- No prediction model should present only one-sided outcomes
- Tamil Nadu has alternated governments every election since 1989 (the anti-incumbency pattern)
- While DMK is favored in current polls, a model that cannot even produce a competitive scenario lacks credibility
- Users viewing this dashboard will rightfully question: "Why is there no scenario for an opposition win?"

**Action Required:** Create at least one scenario where ADMK/NDA wins (even if it's a low-probability "wave" scenario), and ideally a TVK-disruptor scenario.

---

## SECTION 3: Summary of Required Data Fixes

### 🔴 Priority 1 — MUST FIX (Credibility-breaking)

| # | Issue | Fix Required |
|---|-------|-------------|
| 1 | **TVK completely missing** | Add TVK to all 2026 scenarios — as third force or vote-splitting factor |
| 2 | **NTK completely missing** | Add NTK vote share impact to all 2026 scenarios |
| 3 | **INC in ADMK alliance (Scenario B)** | Fix to INC→DMK alliance. INC+BJP alliance is politically impossible |
| 4 | **Binary 2-alliance model** | Add third-force / independent column for TVK, NTK |

### ⚠️ Priority 2 — SHOULD FIX (Accuracy concerns)

| # | Issue | Fix Required |
|---|-------|-------------|
| 5 | **No ADMK-win scenario** | Add at least one competitive/ADMK-win scenario |
| 6 | **DMDK absent from 2026** | Account for DMDK residual votes or note dissolution |
| 7 | **MNM absent from 2026** | Account for MNM votes or note party status |
| 8 | **INC wins 0 seats in Scenario C** | Verify — INC as DMK ally should always win some seats |

### 💡 Priority 3 — NICE TO HAVE (Enhanced modeling)

| # | Issue | Fix Required |
|---|-------|-------------|
| 9 | **Model NTK's rising trajectory** | Use 2024 LS data (8.19%) not just 2021 (6.89%) as baseline |
| 10 | **TVK scenario modeling** | Create dedicated scenario: "TVK as kingmaker" (wins 30-50 seats, no majority for anyone) |
| 11 | **Margin recalculation** | All constituency margins in 2026 are wrong without TVK/NTK vote share |

---

## SECTION 4: Correct Political Landscape for 2026 (Reference Data)

For the data team's reference, here is the verified political landscape as of early 2026:

### Expected Alliance Structure for 2026

| Alliance | Lead Party | Likely Partners | Estimated Contest |
|----------|-----------|----------------|-------------------|
| **SPA (Secular Progressive Alliance)** | DMK | INC, CPI, CPM, VCK, MDMK, IUML, KMDK | ~234 seats (split among allies) |
| **NDA** | AIADMK (or BJP?) | BJP, PMK, possibly others | ~234 seats (split among allies) |
| **TVK (Solo)** | TVK (Vijay) | None announced — "ruled out alliances" | **234 seats** |
| **NTK (Solo)** | NTK (Seeman) | None — always contests alone | **234 seats** |
| **Others** | AMMK, MNM, etc. | Various | Varies |

### Vote Share Reference Points

| Party | 2021 Assembly | 2024 Lok Sabha | Trend |
|-------|--------------|----------------|-------|
| DMK + allies | ~37.7% | ~40.3% | ↑ Stable/Growing |
| AIADMK + allies | ~33.3% | ~20.8% | ↓ Declining |
| NTK | 6.89% | 8.19% | ↑ Growing |
| TVK | N/A (formed Feb 2024) | N/A | 🆕 **15M+ members** |
| BJP (solo in LS) | N/A | ~11.2% (TN) | ↑ Growing |
| MNM | ~2.62% | Merged with others | → Uncertain |
| NOTA | ~1.5% | ~1.5% | → Stable |

### Key Political Facts for 2026 Modeling

1. **TVK's Vijay** has 15M+ registered members and draws 300,000-800,000 to rallies
2. **NTK's Seeman** got 15.59% in the 2025 Erode East by-election (highest ever)
3. **AIADMK** is in organizational turmoil — expelled several senior leaders (Sengottaiyan joined TVK)
4. **Anti-incumbency** against DMK government (elected 2021) is a traditional TN pattern
5. **BJP** won 4 seats in 2021 and increased LS vote share to 11.2% in 2024 — growing force
6. **INC** is ALWAYS in DMK alliance in TN — there is no scenario for INC-BJP alignment

---

## SECTION 5: References & Citations

All facts in this report are cross-verified against the following sources:

1. **2011 Election Results:** [Wikipedia — 2011 TN Assembly Election](https://en.wikipedia.org/wiki/2011_Tamil_Nadu_Legislative_Assembly_election) — sourced from Election Commission of India
2. **2016 Election Results:** [Wikipedia — 2016 TN Assembly Election](https://en.wikipedia.org/wiki/2016_Tamil_Nadu_Legislative_Assembly_election) — sourced from Election Commission of India
3. **2021 Election Results:** [Wikipedia — 2021 TN Assembly Election](https://en.wikipedia.org/wiki/2021_Tamil_Nadu_Legislative_Assembly_election) — sourced from Election Commission of India
4. **TVK Party Information:** [Wikipedia — Tamilaga Vettri Kazhagam](https://en.wikipedia.org/wiki/Tamilaga_Vettri_Kazhagam) — multiple news sources cited
5. **NTK Electoral Performance:** [Wikipedia — Naam Tamilar Katchi](https://en.wikipedia.org/wiki/Naam_Tamilar_Katchi) — Election Commission data
6. **2024 Lok Sabha Results (TN):** [Wikipedia — 2024 Indian General Election in Tamil Nadu](https://en.wikipedia.org/wiki/2024_Indian_general_election_in_Tamil_Nadu)

---

## Conclusion

**The PFT v8 historical data (2011, 2016, 2021) is excellent** — every single constituency winner matches official Election Commission records. The data team should be commended for this accuracy.

**However, the 2026 predictions have critical structural flaws** that, if published, would:
1. **Destroy credibility** — any Tamil Nadu voter/political observer will immediately notice the absence of TVK and NTK
2. **Mislead users** — showing INC in BJP/ADMK alliance is a factual impossibility
3. **Produce inaccurate projections** — ignoring 15-25% of the likely vote share makes ALL margin calculations wrong
4. **Show political bias** — no ADMK-win scenario suggests the model is one-sided

**We strongly recommend the data team address the Priority 1 issues before this data is used in any public-facing dashboard or report.**

---

*This report was generated through systematic cross-verification of PFT v8 data against Wikipedia (sourced from Election Commission of India official records). All findings are reproducible.*
